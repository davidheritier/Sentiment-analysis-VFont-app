from textblob import TextBlob

txt = TextBlob("Hello World. It's good to see you. Thanks for buying this book.")

print(txt.sentiment.polarity, txt.sentiment.subjectivity, txt.sentiment.polarity * txt.sentiment.subjectivity)
