// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import { basename } from "path";
import * as vscode from "vscode";

// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
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
        "replicad-visualiser",
        `Replicad (${basename(fileName)})`,
        vscode.ViewColumn.Beside,
        { enableScripts: true }
      );

      const renderPanel = (txt?: string) => {
        panel.webview.html = getWebViewContent(txt);
      };

      vscode.workspace.onDidSaveTextDocument((e) => {
        renderPanel(e.getText());
      });

      renderPanel(doc?.getText());
    }
  );

  function getWebViewContent(txt?: string) {
    return `<!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Cat Coding</title>
    </head>
    <body>
        <img src="https://media.giphy.com/media/JIX9t2j0ZTN9S/giphy.gif" width="300" />
        <pre>${txt}</pre>
    </body>
    </html>`;
  }

  context.subscriptions.push(disposable);
}

// This method is called when your extension is deactivated
export function deactivate() {}
