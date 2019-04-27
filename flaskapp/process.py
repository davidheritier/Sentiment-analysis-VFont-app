from nltk.corpus import sentiwordnet


def process(strInput):
    #recoit son input depuis le frontend JS
    strInput = getUserInput()

    #mapping entre le user input et le triplet {p,o,n} en allant faire une requete dans une DB externe
    emotionalCursors = getEmotionalCursors(strInput)

    #modifie du CSS en fonction des curseurs emotionelle {p,o,n} | {r,g,b}

    #variations = setVariations(strInput, emotionalCursors)

    return emotionalCursors


def getUserInput():

    return "user phrase"


def getEmotionalCursors(strInput):
    if strInput in sentiwordnet:
        return value01, value02, value03


def setVariations(strInput, emotionalCursors):
    return variationValues
