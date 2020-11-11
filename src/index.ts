import { getRepo, getRepoFile } from './git';

const repo = process.argv.slice(2)[0]?.toLowerCase();
const fileContentsPath = process.argv.slice(2)[1]?.toLowerCase(); // ex. contents/package.json OR contents/some-path-to-file

const isJSON = (str: string | Record<string, unknown>): boolean => {
	if (typeof str === 'object') {
		return true;
	}

	try {
		JSON.parse(str);
	} catch (e) {
		return false;
	}

	return true;
};

const main = async (): Promise<void> => {
	try {
		const repoResult = await getRepo(repo, fileContentsPath);

		if (fileContentsPath) {
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
