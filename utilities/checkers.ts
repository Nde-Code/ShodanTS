// This regular expression has, of course, been tested against ReDoS attacks.
// I used: https://devina.io/redos-checker
export class checkers {

    public static isAnIpV4(ip: string): boolean {

        return /^(25[0-5]|2[0-4][0-9]|1?[0-9]{1,2})(\.(25[0-5]|2[0-4][0-9]|1?[0-9]{1,2})){3}$/.test(ip);

    }

    public static isAnIpV6(ip: string): boolean {
        
        return /^(([0-9a-fA-F]{1,4}:){7}[0-9a-fA-F]{1,4}|::|(([0-9a-fA-F]{1,4}:){1,7}:)|(([0-9a-fA-F]{1,4}:){1,6}:[0-9a-fA-F]{1,4})|(([0-9a-fA-F]{1,4}:){1,5}(:[0-9a-fA-F]{1,4}){1,2})|(([0-9a-fA-F]{1,4}:){1,4}(:[0-9a-fA-F]{1,4}){1,3})|(([0-9a-fA-F]{1,4}:){1,3}(:[0-9a-fA-F]{1,4}){1,4})|(([0-9a-fA-F]{1,4}:){1,2}(:[0-9a-fA-F]{1,4}){1,5})|([0-9a-fA-F]{1,4}:)((:[0-9a-fA-F]{1,4}){1,6})|:((:[0-9a-fA-F]{1,4}){1,7}|:))$/.test(ip);
    
    }

    public static isAnIpV4OrCidr(ip: string): boolean {
       
        return /^((25[0-5]|2[0-4]\d|1\d{2}|[1-9]?\d)(\.(?!$)){3}(25[0-5]|2[0-4]\d|1\d{2}|[1-9]?\d))(\/([1-9]|[12][0-9]|3[0-2]))?$/.test(ip);
    
    }

    public static isAValidDomain(domain: string): boolean {

        return /^(?!\-)(?:[A-Za-z0-9-]{1,63}\.)+[A-Za-z]{2,}$/.test(domain);

    }

    public static isAValidDomainsList(domains: string): boolean {

        return domains.split(',').map(domain => domain.trim()).every(domain => this.isAValidDomain(domain));

    }

    public static isAValidIpsList(ips: string): boolean {

        return ips.split(',').map(ip => ip.trim()).every(ip => (this.isAnIpV4(ip) || this.isAnIpV6(ip)));

    }

}
