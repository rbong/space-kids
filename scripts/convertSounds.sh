#!/usr/bin/env bash

set -e

DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" > /dev/null 2>&1 && pwd)"

VOC_FOLDER=$(readlink -f "${DIR}/../dump/sounds/voc/")
OUT_FOLDER=$(readlink -f "${DIR}/../dump/sounds/wav/")

mkdir -p "${OUT_FOLDER}"

cd "${VOC_FOLDER}"
for VOC in *; do
    FILE=$(readlink -f "${OUT_FOLDER}/${VOC%.*}.wav")
    echo "creating ${FILE}"
    ffmpeg -loglevel error -y -i "${VOC}" "${FILE}"
done
