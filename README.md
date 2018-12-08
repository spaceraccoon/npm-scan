# npm-scan
An extensible, heuristic-based vulnerability scanning tool for installed npm packages.

1. Active heuristics-based scanning: quick and easy for anyone to use
2. Improves/enforces quality of open source coding

## Quickstart
```
npm install https://github.com/spaceraccoon/npm-scan.git
npx npm-scan
```

## Story
Last month (26/11/2018), a popular NPM package [event-stream](1) with millions of weekly installs was [found to contain obfuscated and encrypted malicious code](2) that tries to steal a user's bitcoins. This was caused by an attacker posing as a new maintainer of event-stream adding an unknown dependency ([flatmap-stream](3)) that contained the malicious code.

This incident highlighted the shocking lack of accountability in NPM that had immense ramifications. It is the norm for packages to be linked to a chain of other packages, making it hard to maintain trust.  Furthermore, NPM defaults to accepting all new minor versions of a package, making it even harder to keep track of packages.

Q. So how can we prevent such incidents from happening again?
A. We want to give all users and developers power to check their currently installed node_modules for malicious intent.

Q. How will you do that?
A. We created npm-scan. It uses simple regex-based heuristics to check for suspicious lines of code in any installed node module. Each flagged line is given a severity score. A high severity score on a particular package indicates possible malicious behavior. These scores are compiled into a report for the user to check which dependency contains suspicious code, and determine if there are any areas of concern.  

Q. How is this different from other scanners out there?
A. Most scanners such as Source Clear and Black Duck conduct their scanning based on databases such as the [National Vulnerability Database](4). This is slow as it could be weeks or months by the time a vulnerability is disclosed, inwhich time the malicious package would have been automatically updated on millions of devices. 
Our heuristics-based approach means we are just flagging any suspicious behavior that would not be the norm of typical node packages. For example, flatmap-stream modified the `npm_package_description` as part of its malicious intent, which is not typical behavior. Even if this is flagged with a low severity score (since it isn't exactly behavior in itself), but combine that with other heauristics such as the use of AES to decrypt files in another location, and flatmap-stream starts to look very suspicious. 

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
1. *name*
2. *message*
3. *categories*
4. *reference*

## References
[1]: https://github.com/dominictarr/event-stream
[2]: https://blog.npmjs.org/post/180565383195/details-about-the-event-stream-incident
[3]: https://libraries.io/npm/flatmap-stream/0.1.1
[4]: https://nvd.nist.gov/
https://resources.sei.cmu.edu/asset_files/TechnicalNote/2005_004_001_14474.pdf
https://www.snort.org/rules_explanation
