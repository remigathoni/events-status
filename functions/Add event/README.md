# Add event

The function creates a new document in the event collection of the specified database.

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
    "startDate": "date",
    "endDate": "date (optional)",
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
  "message": "string"
}
```

**Example Usage:**

```javascript

const event = {
  name: "Event name",
  venue: "Event venue",
  startDate: "dd-mm-yyyy",
  endDate: "dd-mm-yyyy (optional)",
  collectionId: `${collectionId}`,
  databaseId: `${databaseId}`
};

const stringifiedEvent = JSON.stringify(event);

axios.post(
  "https://cloud.appwrite.io/v1/functions/{functionId}/executions",
  {
    data: stringifiedEvent,
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
  "message": "Created document!"
}
```
<u>Failure (If no name, start date, or venue is passed):</u>

```json
{
  "success": true,
  "message": "Event name required"
}
```
<u>Failure (If date is wrongly formatted):</u>

```json
{
  "success": false,
  "message": "Unexpected error: Error: Invalid document structure: Attribute \"startDate\" has invalid type. DateTime::__construct(): Failed to parse time string (22=-04-2024) at position 0 (2): Unexpected character"
}
```
Note: The server returns appropriate error messages for other server errors with the "success" value set to false.

## 📝 Environment Variables

List of environment variables used by this cloud function:

- **APPWRITE_FUNCTION_ENDPOINT** - Endpoint of Appwrite project
- **APPWRITE_FUNCTION_API_KEY** - API key of Appwrite function
- **APPWRITE_FUNCTION_PROJECT_ID** - Id of Appwrite project


## 🚀 Deployment

There are two ways of deploying the Appwrite function, both having the same results, but each using a different process. We highly recommend using CLI deployment to achieve the best experience.

### Using CLI

Make sure you have [Appwrite CLI](https://appwrite.io/docs/command-line#installation) installed, and you have successfully logged into your Appwrite server. To make sure Appwrite CLI is ready, you can use the command `appwrite client --debug` and it should respond with green text `✓ Success`.

Make sure you are in the same folder as your `appwrite.json` file and run `appwrite deploy function` to deploy your function. You will be prompted to select which functions you want to deploy.


