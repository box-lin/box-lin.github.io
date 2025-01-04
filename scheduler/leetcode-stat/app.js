import { LeetCode } from "leetcode-query";
import { promises as fs } from 'fs';

async function recentSubmissionFromCN(username) {
  const GRAPHQL_ENDPOINT = 'https://leetcode.cn/graphql/noj-go/';
  const operationName = "recentAcSubmissions";
  const query = `
    query recentAcSubmissions($userSlug: String!) {
      recentACSubmissions(userSlug: $userSlug) {
        submissionId
        submitTime
        question {
          title
          translatedTitle
          titleSlug
          questionFrontendId
        }
      }
    }
  `;
  const variables = { userSlug: username};
  try {
    const response = await fetch(GRAPHQL_ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        operationName,
        query,
        variables
      }),
    });
    let ret = []
    const responseData = await response.json();
    responseData.data.recentACSubmissions.forEach(element => {
      ret.push({
        title: element.question.title,
        titleSlug: element.question.titleSlug,
        timestamp: element.submitTime.toString(),
        statusDisplay: "Accepted",
        lang: "LeetcodeCN Graphql Not Supported"
      })
    });
    return ret;
  } catch (error) {
    console.error('Error fetching data:', error);
  }
}

async function fetchAndSaveRecentSubmissions(username, usernameCN) {
  const leetcode = new LeetCode();
  try {
    const [x,y] = await Promise.all([
      leetcode.recent_submissions(username),
      recentSubmissionFromCN(usernameCN)
    ]);

    const ret = [...x, ...y];
    ret.sort((a,b) => Number(b.timestamp) - Number(a.timestamp));
    const recentSubmissions = ret.slice(0, Math.min(10, ret.length));
    console.log(recentSubmissions);
    
    // Write recentSubmissions to a JSON file
    await fs.writeFile('recentSubmissions.json', JSON.stringify(recentSubmissions, null, 2));
    console.log('Recent submissions saved to recentSubmissions.json');
  } catch (error) {
    console.error('Error fetching recent submissions:', error);
  }
}

fetchAndSaveRecentSubmissions('boxlin', 'ddos-h');




