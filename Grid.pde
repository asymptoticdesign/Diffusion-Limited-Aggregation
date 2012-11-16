class Grid {
  int binSize;
  int noBinsX;
  int noBinsY;
  int totalNoBins;
  ArrayList particleBuckets;
  
  Grid(int _binSize) {
    binSize = _binSize;
    noBinsX = math.ceil(width / _binSize);
    noBinsY = math.ceil(height / _binSize);
    totalNoBins = noBinsX * noBinsY;
    particleBuckets = new Array(totalBins);
  }
 
 void getParticles(int binX, int binY) {
   return particleBuckets[binX + binY * noBinsX];
 }
 
 void getBinNumber(float pos_x, float pos_y) {
   int indexX = Math.floor(pos_x / binSize);
   int indexY = Math.floor(pos_y / binSize);
   return [indexX, indexY];
 }
 
 void addParticle(Particle particle) {
   int indexX = Math.floor(particle.x / binSize);
   int indexY = Math.floor(particle.y / binSize);
   int binNo = 0;
   particleBuckets[binNumber].add(particle);
 }
  
}

int clamp(int value, int minVal, int maxVal) {
  return Math.max(minVal, Math.min(value,maxVal));
}
