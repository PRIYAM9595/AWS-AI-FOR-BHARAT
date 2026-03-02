## Career Simulation Dataset

This project uses Adult income data as base training signal for salary simulation.

### Source
- UCI Adult dataset:
  - https://archive.ics.uci.edu/ml/datasets/adult
  - Direct files:
    - https://archive.ics.uci.edu/ml/machine-learning-databases/adult/adult.data
    - https://archive.ics.uci.edu/ml/machine-learning-databases/adult/adult.test

### Download command
Run from `python_server/`:

```bash
python download_career_datasets.py
```

Files will be placed in `python_server/data/`.

### Notes
- If dataset files are missing, the model automatically uses synthetic fallback data.
- You can replace with your own CSV by adding:
  - `python_server/data/adult.csv` (preferred), or
  - `python_server/data/adult.data`.
