# npm-scan
[![Black Hat Arsenal](https://raw.githubusercontent.com/spaceraccoon/npm-scan/master/bha2019.svg?sanitize=true)]()
[![Contributors](https://img.shields.io/github/contributors/spaceraccoon/npm-scan.svg)]()

An extensible, heuristic-based vulnerability scanning tool for installed npm packages.

## Quickstart
```
npm install https://github.com/spaceraccoon/npm-scan.git
npx npm-scan
```

## Story
Last month (26/11/2018), a popular NPM package [event-stream](1) with millions of weekly installs was [found to contain obfuscated and encrypted malicious code](2) that tries to steal a user's bitcoins. This was caused by an attacker posing as a new maintainer of event-stream adding an unknown dependency ([flatmap-stream](3)) that contained the malicious code.

This incident highlighted the shocking lack of accountability in NPM that had immense ramifications. It is the norm for packages to be linked to a chain of other packages, making it hard to maintain trust.  Furthermore, NPM defaults to accepting all new minor versions of a package, making it even harder to keep track of packages.

#### Q. So how can we prevent such incidents from happening again?
A. We want to give all users and developers power to check their currently installed node_modules for malicious intent.

#### Q. How will you do that?
A. We created npm-scan. It uses simple regex-based heuristics to check for suspicious lines of code in any installed node module. A particular package with many suspicious lines of code indicates possible malicious behavior. These scores are compiled into a report for the user to check which dependency contains suspicious code, and determine if there are any areas of concern.  

#### Q. How is this different from other scanners out there?
A. Most scanners such as Source Clear and Black Duck conduct their scanning based on databases such as the [National Vulnerability Database](4). This is slow as it could be weeks or months by the time a vulnerability is disclosed, inwhich time the malicious package would have been automatically updated on millions of devices. 

Our heuristics-based approach gives immediate feedback on how suspicious a package is without having to run it. The heuristics are just flagging any suspicious behavior that would not be the norm of typical node packages. For example, flatmap-stream is shipped in minified form (under dependencies in package.json), which is not typical behavior (the top 50 node packages, encompassing 1000+ dependencies, all do not ship in minified form). Although this will be flagged with a low severity score (since it isn't exactly malicious behavior in itself), combine that with other heauristics such as containing the hexadecimal version of the string "AES256", and flatmap-stream starts to look very suspicious. This will all be reflected in npm-scan's report.

## Developing
```
git clone https://github.com/spaceraccoon/npm-scan.git
npm link
npm run scan
npm run test
npm run lint
```
Push changes on a separate branch.

## Contributing
To add a new heuristic, you will require the following:
1. **name** - Name of the heuristic
2. **message** - Description of the heuristic
3. **reference** - URL to a report or disclosure of the vulnerability/suspicious code
4. **re** - Regex for picking out the suspicious line of code

## Scoring
Currently, our detection consists of line-based regex. We score each package's severity based on the number of flagged lines. 

In the future, we can assign categories to each heuristic to do more complex scoring, such as one based on [CVSS v3.0](5). 

## References
[1]: https://github.com/dominictarr/event-stream
[2]: https://blog.npmjs.org/post/180565383195/details-about-the-event-stream-incident
[3]: https://libraries.io/npm/flatmap-stream/0.1.1
[4]: https://nvd.nist.gov/
[5]: https://www.first.org/cvss/specification-document
https://resources.sei.cmu.edu/asset_files/TechnicalNote/2005_004_001_14474.pdf
https://www.snort.org/rules_explanation
