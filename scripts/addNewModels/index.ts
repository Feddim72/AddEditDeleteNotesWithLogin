import { execSync } from "child_process";
import "colors";
import { removeModels } from "./removeModels";

const modelsPath = "models/api";

execSync(`rm -rf ${modelsPath}/*`);

const addNewModels = async () => {
  execSync(
    "sc generate -i https://localhost:8080/swagger/v1/swagger.json -l typescript-angular -o ../swaggerModels"
  );

  await removeModels(
    [/Response\s*\{(\s*)\}/, /export (interface|const) Models+/],
    []
  );

  execSync(`mv ../swaggerModels/model/* ${modelsPath}`);
  execSync("rm -r ../swaggerModels");
};

addNewModels();
