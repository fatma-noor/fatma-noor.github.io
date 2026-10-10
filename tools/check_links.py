"""Read-only HTTP checks for the portfolio's requested external links."""
import concurrent.futures
import json
import urllib.error
import urllib.request
from pathlib import Path

root = Path(__file__).resolve().parents[1]
content = json.loads((root / 'content.json').read_text(encoding='utf-8'))
urls = [content['links']['linkedin']['url'], content['links']['github']['url'], content['experience']['items'][0]['url']] + [item['url'] for item in content['projects']['items']]

def check(url):
    request = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
    try:
        with urllib.request.urlopen(request, timeout=25) as response:
            return {'url': url, 'status': response.status, 'finalUrl': response.url}
    except urllib.error.HTTPError as error:
        return {'url': url, 'status': error.code}
    except Exception as error:
        return {'url': url, 'error': str(error)}

with concurrent.futures.ThreadPoolExecutor(max_workers=6) as pool:
    print(json.dumps(list(pool.map(check, urls)), indent=2))
