from textblob import TextBlob


file = open('tb-results.txt','a')


txt = "Hello I am very happy to see you are you pleased?"
tb = TextBlob(txt)
pol = str(tb.sentiment.polarity)
sub = str(tb.sentiment.subjectivity)
mul = str(tb.sentiment.polarity * tb.sentiment.subjectivity)


file.write(txt + '\r')
file.write('polarity: ' + pol)
file.write('\tsubjectivity: ' + sub)
file.write('\tpolarity * subjectivity: ' + mul)
file.write('\r\r')

print('polarity: ' + pol + 'subjectivity: ' + sub + 'multiply: ' mul)
