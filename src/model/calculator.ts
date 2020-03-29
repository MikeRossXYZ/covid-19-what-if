/**
 * Calculate a time series of cumulative infection in a population
 * @param startInfected Number of infected to start
 * @param projectionLength Length of projection in days
 * @param startGrowthRate Growth rate of virus to start
 * @param startDecayRate Decay rate of virus to start
 * @param changes List of potential changes to the growth and decay rates. Each item Tuple is: [day change takes place, variable to change, new value for variable]
 */
export function calculateTimeSeries(startInfected: number, projectionLength: number, startGrowthRate: number, startDecayRate: number, changes: [number, string, number][]){
    const cumulativeInfected = [startInfected];
    let currentInfected = startInfected;
    let growthRate = startGrowthRate;
    let decayRate = startDecayRate;
    for (let day = 0; day < projectionLength; day++) {
        // If changes take place today, then apply them at the beginning of the day
        changes.forEach((chgItem) => {
            if (chgItem[0] == day) {
                if (chgItem[1] == "decay") {
                    decayRate = chgItem[2];
                } else if (chgItem[1] == "growth") {
                    growthRate = chgItem[2];
                }
            }
        });

        // Calculate the new infected for the day
        const newInfected = currentInfected * growthRate;
        currentInfected += newInfected;
        currentInfected = Math.round(currentInfected);
        cumulativeInfected.push(currentInfected);
        // Update growth rate
        growthRate *= decayRate;
    }
    return cumulativeInfected;
}
