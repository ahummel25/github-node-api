import path from 'path';

import { getRepo, getRepoFile } from './git';

const args = process.argv.slice(2);
const repo = args[0]?.toLowerCase();
const repoFileToFetch = args[1]?.toLowerCase(); // ex. contents/package.json OR contents/some-path-to-file

const isJSON = (val: string | Record<string, unknown>): boolean => {
  if (typeof val === 'object') {
    return true;
  }

  try {
    JSON.parse(val);
  } catch (e) {
    return false;
  }

  return true;
};

const main = async (): Promise<void> => {
  try {
    console.log(path.resolve());
    const repoResult = await getRepo(repo, repoFileToFetch);

    if (repoFileToFetch) {
      const { download_url: downloadUrl } = repoResult.data;

      const fileResult = await getRepoFile(downloadUrl);

      if (isJSON(fileResult.data)) {
        console.log(JSON.stringify(fileResult.data, null, 2));
      } else {
        console.log(fileResult.data);
      }
    } else {
      console.log(JSON.stringify(repoResult.data, null, 2));
    }
  } catch (err) {
    console.error(err.message);
  }
};

await main();
