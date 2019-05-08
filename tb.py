from textblob import TextBlob


# file = open('tb-results.txt','a')


txt = "fuck this shit motherfucker shit good news"
tb = TextBlob(txt)
pol = str(tb.sentiment.polarity)
sub = str(tb.sentiment.subjectivity)
mul = str(tb.sentiment.polarity * tb.sentiment.subjectivity)

slant = str(int(tb.sentiment.polarity * 1000))
contrast = str(int(500 + (tb.sentiment.subjectivity / 2 * 1000)))
weight = str(int((tb.sentiment.polarity * 100) * (tb.sentiment.subjectivity * 100) / 10))


# file.write(txt + '\r')
# file.write('polarity: ' + pol)
# file.write('\tsubjectivity: ' + sub)
# file.write('\tpolarity * subjectivity: ' + mul)
# file.write('\r\r')

print('polarity: ' + pol + '\t subjectivity: ' + sub + '\t pol x sub: ' + mul)
print('slant: ' + slant + '\t contrast: ' + contrast + '\t weight: ' + weight)
