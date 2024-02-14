import { basename } from "node:path";
import * as vscode from "vscode";

export function activate(context: vscode.ExtensionContext) {
  const extUri = context.extensionUri;
  let disposable = vscode.commands.registerCommand(
    "replicad-viewer-vscode.renderReplicad",
    () => {
      const doc = vscode.window.activeTextEditor?.document;
      if (!doc) {
        vscode.window.showInformationMessage(
          "Please open a Replicad script before running this command"
        );
        return;
      }

      const fileName = doc?.fileName;
      const panel = vscode.window.createWebviewPanel(
        "replicad-react",
        `Replicad (${basename(fileName)})`,
        vscode.ViewColumn.Beside,
        {
          enableScripts: true,
          localResourceRoots: [extUri],
        }
      );

      const renderPanel = (txt?: string) => {
        panel.webview.html = getWebViewContent(panel.webview, txt);
      };

      vscode.workspace.onDidSaveTextDocument((e) => {
        panel.webview.postMessage(e.getText());
      });

      renderPanel(doc?.getText());
    }
  );

  function getWebViewContent(webView: vscode.Webview, txt?: string) {
    const scriptUri = webView.asWebviewUri(
      vscode.Uri.joinPath(extUri, "dist", "vscode-viewer.mjs")
    );

    const resourceUri = (folderName: string, fileName: string) =>
      webView.asWebviewUri(
        vscode.Uri.joinPath(extUri, "dist", folderName, fileName)
      );

    const styleUri = webView.asWebviewUri(
      vscode.Uri.joinPath(extUri, "dist", "style.css")
    );

    return `<!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <style>
          @font-face {
            font-family: "HKGrotesk";
            font-weight: 500;
            src: url("${resourceUri(
              "fonts",
              "HKGrotesk-Regular.woff2"
            )}") format("woff2");
          }
        
          @font-face {
            font-family: "HKGrotesk";
            font-weight: 300;
            src: url("${resourceUri(
              "fonts",
              "HKGrotesk-Light.woff2"
            )}") format("woff2");
          }
        
          @font-face {
            font-family: "HKGrotesk";
            font-weight: bold;
            src: url("${resourceUri(
              "fonts",
              "HKGrotesk-Bold.woff2"
            )}") format("woff2");
          }
        </style>
        <link rel="stylesheet" type="text/css" href="${styleUri}" />
        <title>Replicad Visualiser</title>
      </head>
      <body>
        <div id="root"></div>
        <script type="text/javascript">
          var REPLICAD_CONFIG = { fontUri: "${resourceUri(
            "fonts",
            "HKGrotesk-Regular.ttf"
          )}", materialUri: "${resourceUri("textures", "matcap-1.png")}" };
        </script>

        <script type="module">
          import { ReplicadAPI } from '${scriptUri}'
          const app = ReplicadAPI.initializeViewer({
            initialCode: atob('${Buffer.from(txt as string, "utf-8").toString(
              "base64"
            )}'),
            onApiCreated: (api) => {
              window.addEventListener('message', event => {
                  api.setCode(event.data);
              });
            }
          });
      </script>
      </body>
    </html>`;
  }

  context.subscriptions.push(disposable);
}

export function deactivate() {}
