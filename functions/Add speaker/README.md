## Add speaker
A cloud function that adds a speaker document in the speaker collection

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
    "title": "string",
    "linkedin": "string",
    "twitter": "string",
    "imageUrl": "string"
  }
}
```
Note: You have to stringify the data.
**Response:**
```json
{
  "success": "boolean",
  "message": "string",
  "speakerId": "string"
}
```

**Example Usage:**

```javascript

const speaker = {
  name: "Jane Doe",
  title: "Software Developer",
  linkedin: "https://linkedin.com/",
  twitter: "https://twitter.com/",
  imageUrl: "https://cloud.appwrite.com/image"
};

const stringifiedSpeaker = JSON.stringify(speaker);

axios.post(
  "https://cloud.appwrite.io/v1/functions/{functionId}/executions",
  {
    data: stringifiedSpeaker,
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
  "message": "Created new speaker!",
  "speakerId": "647b927f416135cd4ef0"
}
```
<u>Failure (If no name is passed):</u>

```json
{
  "success": false,
  "message": "Speaker name required",
  "speakerId": null
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
