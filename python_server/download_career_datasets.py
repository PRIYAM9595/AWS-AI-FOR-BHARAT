from pathlib import Path
from urllib.request import urlretrieve


DATA_DIR = Path(__file__).resolve().parent / "data"
DATA_DIR.mkdir(parents=True, exist_ok=True)

SOURCES = {
    "adult.data": "https://archive.ics.uci.edu/ml/machine-learning-databases/adult/adult.data",
    "adult.test": "https://archive.ics.uci.edu/ml/machine-learning-databases/adult/adult.test",
}


def main() -> None:
    for file_name, url in SOURCES.items():
        target = DATA_DIR / file_name
        print(f"Downloading {url} -> {target}")
        urlretrieve(url, target)
    print("Dataset download completed.")


if __name__ == "__main__":
    main()
