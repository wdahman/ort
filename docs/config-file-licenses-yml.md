# The `license-classifications.yml` file

The `license-classifications.yml` file holds a user-defined categorization of licenses.

You can use the [license-classifications.yml example](../examples/license-classifications.yml) as the base configuration
file for your scans.

The file consists of two sections: The first one, _categories_, allows defining arbitrary categories for grouping
licenses. Categories have a name and an optional description; the names must be unique.

The second section, _categorizations_, assigns licenses to the categories defined before. Licenses are identified
using SPDX identifiers. Each license can be assigned an arbitrary number of categories by listing the names of these
categories. Note that only names can be used that reference one of the categories from the first section.

### When to Use

The mechanism of assigning categories to licenses is rather generic and can be customized for specific use cases.
The information from the `license-classifications.yml` is evaluated by the following components:

* [Rules](file-rules-kts.md): By defining categories like "permissive" or "public domain", rules can determine how
  to handle specific licenses and issue warning or error messages if problems are detected.
* [Notice templates](notice-templates.md): Based on their associated categories, the templates can decide, which
  licenses to include into the generated notice file.

The [license-classifications.yml example](../examples/license-classifications.yml) demonstrates the intended use
cases. It defines some categories that specify whether licenses are applicable to development projects. The
[rules.kts example](../examples/rules.kts) checks ORT results against these categories and generates issues if the
rules detect a misuse.

In addition, there are some other categories to be evaluated by the templates for the notice file: The
*include-in-notice-file* category controls whether or not the license requires attribution. Similarly, assigning the
*include-source-code-offer-in-notice-file* category will ensure a written source code offer is included in the notices.

The point to take is that users can freely choose their license classifications and define their rule sets and
templates accordingly to achieve the desired results. ORT does not enforce any semantics on categories; it is fully
up to concrete use cases how they are interpreted. It is therefore well possible that licenses are assigned to
multiple orthogonal, partly overlapping sets of categories with different meanings.

## Command Line

To use the `license-classifications.yml` file put it to `$ORT_CONFIG_DIR/license-classifications.yml` or pass it to the
`--license-configuration-file` option of the _evaluator_:

```bash
cli/build/install/ort/bin/ort evaluate
  -i [scanner-output-dir]/scan-result.yml
  -o [evaluator-output-dir]
  --output-formats YAML
  --license-configuration-file $ORT_CONFIG_DIR/license-classifications.yml
  --package-curations-file $ORT_CONFIG_DIR/curations.yml
  --rules-file $ORT_CONFIG_DIR/rules.kts
```
