// ============================================
// File Purpose: API route to upload NDA files to AWS S3 using AWS SDK and return the file URL.
// Original Author: Mohammed Ihtisham
// Last Updated By: Mohammed Ihtisham
// Last Updated On: 03/24/2025
// ============================================

import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import type { NextApiRequest, NextApiResponse } from "next";

const s3Client = new S3Client({
    region: process.env.AWS_REGION!,
    credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
    },
});

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === "POST") {
        try {
            const { file, fileName, fileType } = req.body;

            if (!file || !fileName || !fileType) {
                console.error("Missing file data:", { file, fileName, fileType });
                return res.status(400).json({ error: "Missing file data." });
            }

            const buffer = Buffer.from(file, "base64");

            console.log("Uploading to bucket:", process.env.AWS_BUCKET_NAME);

            const params = {
                Bucket: process.env.AWS_BUCKET_NAME!,
                Key: fileName,
                Body: buffer,
                ContentType: fileType,
            };

            const command = new PutObjectCommand(params);
            await s3Client.send(command);

            const fileUrl = `https://${params.Bucket}.s3.${process.env.AWS_REGION}.amazonaws.com/${params.Key}`;

            console.log("Upload successful:", fileUrl);

            return res.status(200).json({ url: fileUrl });
        } catch (error) {
            console.error("Upload error:", error);
            return res.status(500).json({ error: "Failed to upload file." });
        }
    } else {
        res.setHeader("Allow", ["POST"]);
        return res.status(405).json({ error: `Method ${req.method} not allowed` });
    }
}
