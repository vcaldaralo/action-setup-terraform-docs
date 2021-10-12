# action-setup-terraform-docs

GitHub Action for install terraform-docs cli

## Inputs

### Required

`version` - default `latest`

# Example workflow

Never use `main` branch in your github workflows!

```yaml
name: Setup terraform-docs

on: pull_request

jobs:
  helm-suite:
    runs-on: ubuntu-latest
    steps:
    - uses: actions/checkout@v2

    # - name: myOtherJob1
    #   run:

      - name: "Setup terraform docs"
        uses: vcaldaralo/action-terraform-docs@master
        with:
          version: "v0.16.0"
```
