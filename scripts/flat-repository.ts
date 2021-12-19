// the Sublime Text doesn't support nested `repository` in .tmLanguage,
// so we flat them to make them work in Sublime Text.

export interface ITmLanguage {
  name: string;
  scopeName: string;
  patterns: IPattern[];
  repository?: IRepository;
  fileTypes?: string[];
  [others: string]: unknown;
}

export interface IRepository {
  [name: string]: IPattern;
}

// convert from https://raw.githubusercontent.com/martinring/tmlanguage/master/tmlanguage.json
export interface IPattern {
  comment?: string;
  disabled?: 0 | 1;
  include?: string;
  match?: string;
  name?: string;
  contentName?: string;
  begin?: string;
  end?: string;
  while?: string;
  captures?: ICapture;
  beginCaptures?: ICapture;
  endCaptures?: ICapture;
  whileCaptures?: ICapture;
  patterns?: IPattern[];
  applyEndPatternLast?: 0 | 1;

  // `repository` in `pattern` is not defined in the original tmLanguage,
  // but it is possible in a linguist syntax defination.
  repository?: IRepository;
}
export interface ICapture {
  [index: string]: {
    name?: string;
    patterns?: IPattern[];
  };
}

export function flatRepository(tm: ITmLanguage) {
  if (tm.repository == null) {
    tm.repository = {};
  }
  const rootRepository = tm.repository!;

  function walk(
    pattern: IPattern,
    ancestryPatternsName: string[],
    context: Record<string, string> = Object.create(null),
  ) {
    const newContext = structuredClone(context);

    if (pattern.repository != null) {
      for (const oldSubPatternName of Object.keys(pattern.repository)) {
        let newSubPatternName = [...ancestryPatternsName, oldSubPatternName]
            .join("-"),
          i = 0;

        while (true) {
          if (rootRepository[newSubPatternName] != null) {
            i += 1;
            newSubPatternName = [...ancestryPatternsName, oldSubPatternName, i]
              .join("-");
          } else {
            break;
          }
        }

        newContext[`#${oldSubPatternName}`] = `#${newSubPatternName}`;

        rootRepository[newSubPatternName] =
          pattern.repository[oldSubPatternName];
        delete pattern.repository[oldSubPatternName];

        walk(rootRepository[newSubPatternName], [
          ...ancestryPatternsName,
          oldSubPatternName,
        ], newContext);
      }
      delete pattern.repository;
    }

    if (pattern.include != null && newContext[pattern.include] != null) {
      pattern.include = newContext[pattern.include];
    }

    if (pattern.captures != null) {
      for (const captureIndex of Object.keys(pattern.captures)) {
        const capture = pattern.captures[captureIndex];
        const subPatterns = capture.patterns;
        if (subPatterns != null) {
          subPatterns.forEach((subPattern, index) => {
            walk(subPattern, [
              ...ancestryPatternsName,
              `captures--${
                capture.name ?? "unnamedcapture"
              }${captureIndex}--p${index}`,
            ], newContext);
          });
        }
      }
    }

    if (pattern.beginCaptures != null) {
      for (const captureIndex of Object.keys(pattern.beginCaptures)) {
        const capture = pattern.beginCaptures[captureIndex];
        const subPatterns = capture.patterns;
        if (subPatterns != null) {
          subPatterns.forEach((subPattern, index) => {
            walk(subPattern, [
              ...ancestryPatternsName,
              `beginCaptures--${
                capture.name ?? "unnamedcapture"
              }${captureIndex}--p${index}`,
            ], newContext);
          });
        }
      }
    }

    if (pattern.endCaptures != null) {
      for (const captureIndex of Object.keys(pattern.endCaptures)) {
        const capture = pattern.endCaptures[captureIndex];
        const subPatterns = capture.patterns;
        if (subPatterns != null) {
          subPatterns.forEach((subPattern, index) => {
            walk(subPattern, [
              ...ancestryPatternsName,
              `endCaptures--${
                capture.name ?? "unnamedcapture"
              }${captureIndex}--p${index}`,
            ], newContext);
          });
        }
      }
    }

    if (pattern.whileCaptures != null) {
      for (const captureIndex of Object.keys(pattern.whileCaptures)) {
        const capture = pattern.whileCaptures[captureIndex];
        const subPatterns = capture.patterns;
        if (subPatterns != null) {
          subPatterns.forEach((subPattern, index) => {
            walk(subPattern, [
              ...ancestryPatternsName,
              `whileCaptures--${
                capture.name ?? "unnamedcapture"
              }${captureIndex}--p${index}`,
            ], newContext);
          });
        }
      }
    }

    if (pattern.patterns != null) {
      pattern.patterns.forEach((subPattern, index) => {
        walk(
          subPattern,
          [...ancestryPatternsName, `patterns--i${index}`],
          newContext,
        );
      });
    }
  }

  for (const patternName of Object.keys(rootRepository)) {
    walk(rootRepository[patternName], [patternName]);
  }

  if (Object.keys(tm.repository).length === 0) {
    delete tm.repository;
  }
}
