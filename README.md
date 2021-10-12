# action-helm-tools

GitHub Action for install terraform-docs cli

## Inputs

### Required

`version` - default `latest`

# Example workflow

Never use `main` branch in your github workflows!

```yaml
name: Helm lint, test, package and publish

on: pull_request

jobs:
  helm-suite:
    runs-on: ubuntu-latest
    steps:
    - uses: actions/checkout@v2

    # - name: myOtherJob1
    #   run:

      - name: "Setup terraform docs"
        uses: vcaldaralo/action-setup-terraform-docs@master
        with:
          version: "v0.16.0"
```
