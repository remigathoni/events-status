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

    let { name, title, twitter, linkedin, imageUrl, databaseId, collectionId } =
      payload;

    if (!databaseId || !collectionId)
      return res.json({
        success: false,
        message: "Missing database information",
        speakerId: null,
      });
    // Check if required values are sent in request payload
    if (!name)
      return res.json({
        success: false,
        message: "Speaker name is required",
        speakerId: null,
      });

    const response = await databases.createDocument(
      databaseId,
      collectionId,
      ID.unique(),
      {
        name,
        title,
        twitter,
        linkedin,
        imageUrl,
      }
    );

    res.json({
      success: true,
      message: "Created new session",
      speakerId: response.$id,
    });
  } catch (e) {
    res.json({
      success: false,
      message: "Unexpected error: " + e,
      speakerId: null,
    });
  }
};
