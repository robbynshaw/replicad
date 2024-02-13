// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import { basename } from "node:path";
import * as vscode from "vscode";

// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
  const extUri = context.extensionUri;
  // Use the console to output diagnostic information (console.log) and errors (console.error)
  // This line of code will only be executed once when your extension is activated
  console.log(
    'Congratulations, your extension "replicad-viewer-vscode" is now active and willing!'
  );

  // The command has been defined in the package.json file
  // Now provide the implementation of the command with registerCommand
  // The commandId parameter must match the command field in package.json
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
      // The code you place here will be executed every time your command is executed
      // Display a message box to the user
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
        renderPanel(e.getText());
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
        <pre>${txt}</pre>
        <div id="root"></div>
        <script type="text/javascript">
          var REPLICAD_CONFIG = { fontUri: "${resourceUri(
            "fonts",
            "HKGrotesk-Regular.ttf"
          )}", materialUri: "${resourceUri("textures", "matcap-1.png")}" };
        </script>
        <script type="module" src="${scriptUri}"></script>
      </body>
    </html>`;
  }

  context.subscriptions.push(disposable);
}

// This method is called when your extension is deactivated
export function deactivate() {}
