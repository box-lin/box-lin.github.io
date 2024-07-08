import { LeetCode } from "leetcode-query";
import { promises as fs } from 'fs';

async function fetchAndSaveRecentSubmissions(username) {
  const leetcode = new LeetCode();
  try {
    const recentSubmissions = await leetcode.recent_submissions(username);
    console.log(recentSubmissions);
    
    // Write recentSubmissions to a JSON file
    await fs.writeFile('recentSubmissions.json', JSON.stringify(recentSubmissions, null, 2));
    console.log('Recent submissions saved to recentSubmissions.json');
  } catch (error) {
    console.error('Error fetching recent submissions:', error);
  }
}

fetchAndSaveRecentSubmissions('boxlin');