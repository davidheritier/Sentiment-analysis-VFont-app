from nltk import pos_tag
from nltk.tokenize import RegexpTokenizer
from nltk.corpus import stopwords, wordnet as wn, sentiwordnet as swn
from nltk.stem import WordNetLemmatizer
from replacers import RegexpReplacer, SpellingReplacer

# Text to process
txt = "Hello World. It's better to see you. Thanks for buying this book."


# Define the contraction algorithm
reg = RegexpReplacer()
# Define the spelling algorithm
corr = SpellingReplacer()
# Define the lemmatizer algorithm, which will get the root of each word
lemm = WordNetLemmatizer()
# Define the punctuation suppression algorithm
punct = RegexpTokenizer(r'\w+')
# Define the stop words, common words meaningless for the sentence
#stopset = set(stopwords.words('english'))


# Process the text
# Replace contractions
regex_txt = reg.correct(txt)
# Correct the spelling
corrected_txt = corr.spelling(regex_txt)
# Delete punctuation and separate each word
tokenized_txt = punct.tokenize(corrected_txt)
# Tag the words
tagged_txt = pos_tag(tokenized_txt)

for word in tagged_txt:
    lemmatized_word = lemm.lemmatize(word[0] + ', ' + word[1])
    print(lemmatized_word)


# for raw_word in raw_words:
#     word = wn.synset(raw_word)
#     print(word)

# # Loop through the words
# for word in tagged_words:
#     # Get their sentiment value
#     swn_words = swn.senti_synset(word)
#     print(word)
