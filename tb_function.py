from textblob import TextBlob


def tb_function(string_to_test):

    txt = TextBlob(string_to_test)

    print(txt.sentiment.polarity, txt.sentiment.subjectivity, txt.sentiment.polarity * txt.sentiment.subjectivity)

    return txt.sentiment
