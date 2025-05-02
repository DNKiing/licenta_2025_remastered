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
        return res.status(400).json({ success: false, error: pathStderr.trim() });
      }

      const wslCompatiblePath = wslPath.trim();

      // Compile the C code
      exec(`wsl gcc "${wslCompatiblePath}" -o temp 2>&1`, (compileError, stdout, compileStderr) => {
        fs.unlinkSync(tempFilePath); // Clean up the temporary file

        if (compileError) {
          // Use regex to remove everything before "error:"
          const errorLines = stdout
            .split("\n")
            .map((line) => {
              const errorIndex = line.indexOf("error:");
              return errorIndex !== -1 ? line.slice(errorIndex) : null; // Keep only the part after "error:"
            })
            .filter((line) => line !== null) // Remove null lines
            .join("\n");

          return res.status(400).json({ success: false, error: errorLines.trim() });
        }

        // If compilation succeeds, execute the binary
        exec(`wsl ./temp`, (execError, stdout, stderr) => {
          if (fs.existsSync("temp")) fs.unlinkSync("temp"); // Clean up the binary

          if (execError) {
            // Return the runtime error
            return res.status(400).json({ success: false, error: stderr.trim() });
          }

          // Return the program output
          res.status(200).json({ success: true, output: stdout.trim() });
        });
      });
    });
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}
