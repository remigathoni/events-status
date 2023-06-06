## Add session
A cloud function that adds a session document in the session collection

**Endpoint:**
POST https://cloud.appwrite.io/v1/functions/{functionId}/executions

**Headers:**

Content-Type: application/json

X-Appwrite-Project: {projectId}

**Request Body:**


```json
{
  "data": {
    "name": "string",
    "venue": "string",
    "startTime": "date",
    "endTime": "date (optional)",
    "speakers": "string[]",
    "resourceLink": "resourceLink",
    "collectionId": "string",
    "databaseId": "string"
  }
}
```
Note: You have to stringify the data.
**Response:**
```json
{
  "success": "boolean",
  "message": "string",
  "sessionId": "string" // document id of the created session
}
```

**Example Usage:**

```javascript

const session = {
  name: "Session name",
  venue: "Session venue",
  startTime: "dd-mm-yyyy hh:mm",
  endTime: "dd-mm-yyyy hh:mm",
  speakers: ["647b927f416135cd4ef0", "647b927f416135cd4ef0"], 
  resourceLink: "https://resourceexample.com/1",
  collectionId: `${collectionId}`,
  databaseId: `${databaseId}`
};

const stringifiedSession = JSON.stringify(session);

axios.post(
  "https://cloud.appwrite.io/v1/functions/{functionId}/executions",
  {
    data: stringifiedSession,
  },
  {
    headers: {
      "Content-Type": "application/json",
      "X-Appwrite-Project": `${projectId}`,
    },
  }
)
  .then((res) => {
    console.log(res.data.response);
  })
  .catch((error) => {
    console.log(error);
  });
```

**Sample Responses:**

<u>Success</u>

```json
{
  "success": true,
  "message": "Created new session!",
  "sessionId": null

}
```
<u>Failure (If no name, start date, or venue is passed):</u>

```json
{
  "success": false,
  "message": "Session name required",
  "sessionId": null
}
```
<u>Failure (If date is wrongly formatted):</u>

```json
{
  "success": false,
  "message": "Unexpected error: Error: Invalid document structure: Attribute \"startDate\" has invalid type. DateTime::__construct(): Failed to parse time string (22=-04-2024) at position 0 (2): Unexpected character",
  "sessionId": null
}
```

## 📝 Environment Variables

List of environment variables used by this cloud function:

- **APPWRITE_FUNCTION_ENDPOINT** - Endpoint of Appwrite project
- **APPWRITE_FUNCTION_API_KEY** - Appwrite API Key
- **APPWRITE_PROJECT_ID** - Appwrite project Id


## 🚀 Deployment

There are two ways of deploying the Appwrite function, both having the same results, but each using a different process. We highly recommend using CLI deployment to achieve the best experience.

### Using CLI

Make sure you have [Appwrite CLI](https://appwrite.io/docs/command-line#installation) installed, and you have successfully logged into your Appwrite server. To make sure Appwrite CLI is ready, you can use the command `appwrite client --debug` and it should respond with green text `✓ Success`.

Make sure you are in the same folder as your `appwrite.json` file and run `appwrite deploy function` to deploy your function. You will be prompted to select which functions you want to deploy.

### Manual using tar.gz

Manual deployment has no requirements and uses Appwrite Console to deploy the tag. First, enter the folder of your function. Then, create a tarball of the whole folder and gzip it. After creating `.tar.gz` file, visit Appwrite Console, click on the `Deploy Tag` button and switch to the `Manual` tab. There, set the `entrypoint` to `src/index.js`, and upload the file we just generated.
