#!/bin/bash -l
set -eo pipefail

export TFDOCS_VERSION=${TFDOCS_VERSION:="v0.16.0"}

print_title(){
    echo "#####################################################"
    echo "$1"
    echo "#####################################################"
}

get_terraform_docs() {
    print_title "Get terraform-docs: ${TFDOCS_VERSION}"
    cd /tmp
    echo ${PWD}
    curl -Lo ./terraform-docs.tar.gz "https://github.com/terraform-docs/terraform-docs/releases/download/${TFDOCS_VERSION}/terraform-docs-${TFDOCS_VERSION}-linux-arm64.tar.gz"
    tar -xzf terraform-docs.tar.gz
    chmod +x terraform-docs
    sudo mv terraform-docs /usr/local/bin/terraform-docs
    echo "$(ls -l /usr/local/bin/| grep terraform)"
    echo $PATH
    echo "$(terraform-docs -v)"
}

install_terraform_docs() {
    if ! command -v terraform-docs; then
        echo "Terraform docs is missing"
        get_terraform_docs
    elif ! [[ $(terraform-docs -v | grep -Eo 'v([0-9]+\.[0-9]+\.[0-9]+)') == *${TFDOCS_VERSION}* ]]; then
        echo "terraform docs $(terraform-docs -v | grep -Eo 'v([0-9]+\.[0-9]+\.[0-9]+)') is not desired version"
        get_terraform_docs
    fi
}

remove_terraform_docs(){
    sudo rm -rf /usr/local/bin/terraform-docs
}
