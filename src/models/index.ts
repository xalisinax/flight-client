interface CreateFlightRequest {
  origin: string;
  destination: string;
  capacity: number;
  provider: string;
  takeOffAt: string;
}

interface FlightDto {
  id: string;
  origin: string;
  destination: string;
  capacity: number;
  provider: string;
  takeOff: string;
}

interface FlightReservationDto {
  origin: string;
  destination: string;
  provider: string;
  takeOffAt: string;
  seat: string;
}

export type { CreateFlightRequest, FlightDto, FlightReservationDto };
