import random
import numpy as np
speciesSize = 1000000
randomSize =  800000

period = 1

pool = range(0, speciesSize)
numCount = {}
for i in range(0, randomSize):
    t = random.choice(pool)
    numCount[t] = numCount.get(t, 0) + 1

values = numCount.values()
hist, _ = np.histogram(values, bins=range(min(values), max(values) + 2))
hist = hist.tolist()
print hist



