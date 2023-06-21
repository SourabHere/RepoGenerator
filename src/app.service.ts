import { Injectable } from '@nestjs/common';
const { createOAuthAppAuth } = require("@octokit/auth-oauth-app");
const { Octokit } = require("@octokit/rest");
const { Base64 } = require("js-base64");
import { config } from 'dotenv';

config();

let CLIENT_ID = process.env.CLIENT_ID;
let CLIENT_SECRET = process.env.CLIENT_SECRET;

@Injectable()
export class AppService {

  async create_repo(code) {

    //checking if code is passed or not, If not passed throwing error
    if (!code) {
      throw new Error("No code!");
    }

    //authorizing user with code recieved
    const auth = createOAuthAppAuth({
      clientType: "oauth-app",
      clientId: CLIENT_ID,
      clientSecret: CLIENT_SECRET,
    });
    const userAuthenticationFromWebFlow = await auth({
      type: "oauth-user",
      code: code,
    })
    const octokit = new Octokit({
      auth: userAuthenticationFromWebFlow.token,
    });

    //Fetching Information of the user
    // const { data } = await octokit.request("/user");

    //Making repository with name "new_repo"
    // const data = await octokit.rest.repos.createForAuthenticatedUser({
    //   name: "new_repo",
    // });
    // Making repository with name "new_repo"
    const { data: repoData } = await octokit.rest.repos.createForAuthenticatedUser({
      name: "new_repo",
    });

    // Creating the hello world HTML file content
    const content = `<!DOCTYPE html>
    <html>
    <head>
      <title>Hello World</title>
    </head>
    <body>
      <h1>Hello World!</h1>
    </body>
    </html>`;

    // Encoding the content to Base64
    const encodedContent = Base64.encode(content);

    // Creating the file in the repository
    const { data: fileData } = await octokit.rest.repos.createOrUpdateFileContents({
      owner: repoData.owner.login,
      repo: repoData.name,
      path: "hello.html",
      message: "Create hello.html",
      content: encodedContent,
    });

    return fileData;

  }


}
