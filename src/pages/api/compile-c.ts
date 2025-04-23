import { NextApiRequest, NextApiResponse } from "next";
import { exec } from "child_process";
import fs from "fs";
import path from "path";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "POST") {
    const { code } = req.body;

    // Save the user's code to a temporary file
    const tempFilePath = path.join(process.cwd(), "temp.c");
    fs.writeFileSync(tempFilePath, code);

    // Convert the Windows path to a WSL-compatible path
    exec(`wsl wslpath "${tempFilePath}"`, (pathError, wslPath, pathStderr) => {
      if (pathError) {
        fs.unlinkSync(tempFilePath);
        return res.status(400).json({ success: false, error: pathStderr });
      }

      const wslCompatiblePath = wslPath.trim();

      // Compile the C code
      exec(`wsl gcc "${wslCompatiblePath}" -o temp`, (compileError, _, compileStderr) => {
        if (compileError) {
          fs.unlinkSync(tempFilePath);
          return res.status(400).json({ success: false, error: compileStderr });
        }

        // Execute the compiled binary
        exec(`wsl ./temp`, (execError, stdout, stderr) => {
          // Clean up temporary files
          fs.unlinkSync(tempFilePath);
          if (fs.existsSync("temp")) fs.unlinkSync("temp");

          if (execError) {
            return res.status(400).json({ success: false, error: stderr });
          }

          res.status(200).json({ success: true, output: stdout.trim() });
        });
      });
    });
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}
