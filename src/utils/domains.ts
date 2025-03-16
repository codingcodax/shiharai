import { ccTLDs } from '~/config/cctlds';
import { SECOND_LEVEL_DOMAINS, SPECIAL_APEX_DOMAINS } from '~/config/domains';

export const getApexDomain = (url: string) => {
  let domain;
  try {
    // replace any custom scheme (e.g. notion://) with https://
    // use the URL constructor to get the hostname
    domain = new URL(url.replace(/^[a-zA-Z]+:\/\//, 'https://')).hostname;
  } catch {
    return '';
  }
  if (domain === 'youtu.be') return 'youtube.com';

  const parts = domain.split('.');
  if (parts.length > 2) {
    if (
      // if this is a second-level TLD (e.g. co.uk, .com.ua, .org.tt), we need to return the last 3 parts
      (SECOND_LEVEL_DOMAINS.has(parts[parts.length - 2]!) &&
        ccTLDs.has(parts[parts.length - 1]!)) ||
      // if it's a special subdomain for website builders (e.g. weathergpt.vercel.app/)
      SPECIAL_APEX_DOMAINS.has(parts.slice(-2).join('.'))
    ) {
      return parts.slice(-3).join('.');
    }
    // otherwise, it's a subdomain (e.g. dub.vercel.app), so we return the last 2 parts
    return parts.slice(-2).join('.');
  }
  // if it's a normal domain (e.g. dub.co), we return the domain
  return domain;
};
