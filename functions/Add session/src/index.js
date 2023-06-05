const sdk = require("node-appwrite");

module.exports = async function (req, res) {
  const client = new sdk.Client();
  const databases = new sdk.Databases(client);
  const { ID } = require("node-appwrite");

  if (
    !req.variables["APPWRITE_FUNCTION_ENDPOINT"] ||
    !req.variables["APPWRITE_FUNCTION_API_KEY"] ||
    !req.variables["APPWRITE_FUNCTION_PROJECT_ID"]
  ) {
    res.json({ success: false, message: "Variables missing." });
    return;
  }

  client
    .setEndpoint(req.variables["APPWRITE_FUNCTION_ENDPOINT"])
    .setProject(req.variables["APPWRITE_FUNCTION_PROJECT_ID"])
    .setKey(req.variables["APPWRITE_FUNCTION_API_KEY"]);

  try {
    const payload = JSON.parse(req.payload ?? {});

    const {
      name,
      venue,
      startTime,
      endTime,
      resourceLink,
      speakers,
      databaseId,
      collectionId,
    } = payload;

    if (!databaseId || !collectionId)
      return res.json({
        success: false,
        message: "Missing database information",
      });

    // Check if required values are sent in request payload
    if (!name)
      return res.json({
        success: false,
        message: "Event name is required",
      });
    if (!venue)
      return res.json({
        success: false,
        message: "Session venue is required",
      });
    if (!startTime || !endTime)
      return res.json({
        success: false,
        message: "Session start time and end time required",
      });
    if (!(speakers.length > 0))
      return res.json({
        success: false,
        message: "Add at least one speaker for the session",
      });

    await databases.createDocument(databaseId, collectionId, ID.unique(), {
      name,
      startTime,
      endTime,
      venue,
      speakers,
      resourceLink,
    });

    res.json({
      success: true,
      message: "Created new session",
    });
  } catch (e) {
    res.json({
      success: false,
      message: "Unexpected error: " + e,
    });
  }
};
