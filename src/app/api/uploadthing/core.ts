import type { FileRouter } from 'uploadthing/next';
import { createUploadthing } from 'uploadthing/next';
import { UploadThingError } from 'uploadthing/server';

import { auth } from '~/server/auth';

const f = createUploadthing();

export const ourFileRouter = {
  imageUploader: f({
    image: {
      /**
       * For full list of options and defaults, see the File Route API reference
       * @see https://docs.uploadthing.com/file-routes#route-config
       */
      maxFileSize: '1MB',
      maxFileCount: 1,
    },
  })
    .middleware(async ({ req: _req }) => {
      const session = await auth();
      const user = session?.user;
      if (!user)
        // eslint-disable-next-line @typescript-eslint/only-throw-error
        throw new UploadThingError({
          message: 'You must be logged in to upload files',
          code: 'BAD_REQUEST',
        });

      return { userId: user.id };
    })
    .onUploadComplete(async ({ file, metadata }) => {
      return { uploadedBy: metadata.userId, id: file.key };
    }),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
