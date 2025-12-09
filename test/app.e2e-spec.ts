import { Test, TestingModule } from '@nestjs/testing';
import { TicketsService } from '../src/tickets/tickets.service';


describe('TicketsService', () => {
let service: TicketsService;


beforeEach(async () => {
const module: TestingModule = await Test.createTestingModule({
providers: [
TicketsService,
{
provide: 'TicketRepository',
useValue: {
create: jest.fn(),
save: jest.fn(),
findOne: jest.fn(),
count: jest.fn(),
},
},
],
}).compile();


service = module.get<TicketsService>(TicketsService);
});


it('should be defined', () => {
expect(service).toBeDefined();
});
});