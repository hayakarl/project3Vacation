import { describe, it } from 'mocha';
import { expect } from 'chai';
import { destinationService } from '../src/Services/DestinationService';
import { DestinationModel } from '../src/Models/DestinationModel';

// Number of testing:
describe('Testing Apply Filter', () => {
  // Testing one thing:
  it('Should return a correct filter', () => {
    const destinations: DestinationModel[] = [
      {
          id: 113,
          destination: 'שוויץ',
          description: ' goog vacation',
          fromDate: '2024-06-28T21:00:00.000Z',
          untilDate: '2024-07-05T21:00:00.000Z',
          price: 1600.00,
          imageName: '802fb4de-8713-4a15-bf5b-f74d21581d83.jpg',
          isLiked: 1,
          likesCount: 3,
          image: new File([""], "filename"),
      },
      
      
    ];
    const filter = "all"
    const expected = []
    const result = destinationService.applyFilters(destinations, filter);
  
    expect(result).to.equal(expect);
  });

});
