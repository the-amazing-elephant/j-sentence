# j-sentence
A lightweight Japanese-English sentence randomizer with a simple filter for sentence complexity. Data is from the [Tatoeba Project](https://tatoeba.org/eng/). Made using React and Flask.

## To run on your local server


### Using Docker
```bash
docker pull wireman27/j-sentence
docker run -d -p 8000:8000 wireman27/j-sentence
```
Open 0.0.0.0:8000 in your browser.

### Manually
```bash
git clone https://github.com/the-amazing-elephant/j-sentence.git
cd j-sentence
virtualenv -p python3.6 www
cd www
source ./bin/activate
pip install -r requirements.txt
python3 server.py
```
Open localhost:8000 in your browser.
