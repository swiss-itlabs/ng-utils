# Contributing to itlabs

This guideline is based on angular's [contributing guidelines](https://github.com/angular/angular/blob/master/CONTRIBUTING.md). If you are already familiar with angular's [contributing guidelines](https://github.com/angular/angular/blob/master/CONTRIBUTING.md) you can stop reading here.

## Found a Bug?

If you find a bug in the source code, you can help us by [submitting an issue](#Submitting-an-Issue). Even better, you can [submit a Pull Request](#Submitting-a-Pull-Request) with a fix.

## Submitting an Issue

Before you submit an issue, please search the issue tracker, maybe an issue for your problem already exists and the discussion might inform you of workarounds readily available.

Please provide a minimal reproduction of the bug. Having a minimal reproducible scenario gives us a wealth of important information without going back & forth to you with additional questions.

We will be insisting on a minimal reproduction scenario in order to save maintainers time and ultimately be able to fix more bugs. 

## Submitting a Pull Request

Before you submit your Pull Request (PR) consider the following guidelines:

1. [Search](https://github.com/swiss-itlabs/ng-utils/pulls) for an open or closed PR that relates to your submission. You don't want to duplicate effort.
2. Be sure that an issue describes the problem you're fixing, or documents the design for the feature you'd like to add. Discussing the design up front helps to ensure that we're ready to accept your work.
3. Fork the [swiss-itlabs/ng-utils](https://github.com/swiss-itlabs/ng-utils) repo.
4. Create your patch, including **appropriate test cases**.
5. Follow our [coding rules](#Coding-Rules).
6. Run the following npm scripts, `npm run build`, `npm run test` and `npm run lint`.
7. Commit your changes using a descriptive commit message that follows our [commit message conventions](#Commit-Message-Guidelines).
8. In GitHub, send a pull request to ng-utils:master.

That's it! Thank you for your contribution!

## Coding Rules

- All features or bug fixes **must be tested** by one or more specs (unit-tests).
- All properties and all protected and public methods **must be documented**. It's checked by lint rule `completed-docs`.

## Commit Message Guidelines

For auto generated CHANGELOG we are using [semantic-release](https://github.com/semantic-release/semantic-release) with angular as preset.
Please check [Angular Commit Message Guidelines](https://github.com/angular/angular/blob/master/CONTRIBUTING.md#-commit-message-guidelines) for commit message format.