import { CreateFlightRequest } from "@/models";
import { HttpUtil } from "@/utils";

class FlightService {
  private readonly createUrl = "v1/flights";
  private readonly getUrl = "v1/flights";
  private readonly reserveUrl = "v1/flights/{id}/reserve";
  private readonly mineUrl = "v1/flights/mine";
  private readonly unreserveUrl = "v1/flights/{id}/mine";

  create(model: CreateFlightRequest) {
    return HttpUtil.post(this.createUrl, model);
  }

  get() {
    return HttpUtil.get(this.getUrl);
  }

  reserve(id: string, seat: string) {
    const url = this.reserveUrl.replace("{id}", id);

    return HttpUtil.patch(url, { seat: seat });
  }

  mine() {
    return HttpUtil.get(this.mineUrl);
  }

  unreserve(id: string) {
    const url = this.unreserveUrl.replace("{id}", id);

    return HttpUtil.delete(url);
  }
}

const flightService = new FlightService();

export { flightService as FlightService };
