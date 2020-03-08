import * as dynamoDbLib from "../libs/dynamodb-lib";
import { success, failure } from "../libs/response-lib";

export async function main(event, context) {
  const params = {
    TableName: process.env.tableName,
    Key: {
      UserId: event.requestContext.identity.cognitoIdentityId,
      ProductId: event.pathParameters.id
    }
  };

  try {
    const result = await dynamoDbLib.call("get", params);
    console.log(result);
    if (result.Item) {
      return success(result.Item);
    } else {
      return failure({ status: false, error: "Item not found." });
    }
  } catch (e) {
    return failure({ status: false, error: e, errorStack: e.stackTrace });
  }
}
