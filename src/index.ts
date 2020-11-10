import { getRepo, getRepoFile } from './git';

const repo = process.argv.slice(2)[0];
const fileContentsUrl = process.argv.slice(2)[1]?.toLowerCase(); // ex. contents/package.json OR contents/some-path-to-file

if (!repo) {
	throw new Error('Repository argument must be passed!');
}

(async () => {
	try {
		const repoResult = await getRepo(repo, fileContentsUrl);

		if (fileContentsUrl) {
			const fileResult = await getRepoFile(repoResult.data.download_url);

			console.log(JSON.stringify(fileResult.data, null, 2));
		} else {
			console.log(JSON.stringify(repoResult.data, null, 2));
		}
	} catch (err) {
		console.error(err);
	}
})();
