from textblob import TextBlob
# from textblob.sentiments import NaiveBayesAnalyzer


def tb_function(string_to_test):

    txt = TextBlob(string_to_test) #, analyzer=NaiveBayesAnalyzer())

    # print(txt.sentiment.polarity, txt.sentiment.subjectivity)

    return txt.sentiment
