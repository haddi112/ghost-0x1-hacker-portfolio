import Text "mo:core/Text";
import Int "mo:core/Int";
import Array "mo:core/Array";
import Runtime "mo:core/Runtime";
import Order "mo:core/Order";
import Map "mo:core/Map";
import Time "mo:core/Time";
import Iter "mo:core/Iter";
import Principal "mo:core/Principal";

actor {
  type Message = {
    name : Text;
    email : Text;
    content : Text;
    timestamp : Time.Time;
  };

  module Message {
    public func compare(message1 : Message, message2 : Message) : Order.Order {
      switch (Int.compare(message2.timestamp, message1.timestamp)) {
        case (#equal) { Text.compare(message2.name, message1.name) };
        case (order) { order };
      };
    };
  };

  let messages = Map.empty<Nat, Message>();

  var nextId = 0;

  let admin : Principal = Principal.fromText(
    "2vxsx-fae"
  );

  public shared ({ caller }) func submitMessage(name : Text, email : Text, content : Text) : async () {
    let message : Message = {
      name;
      email;
      content;
      timestamp = Time.now();
    };

    messages.add(nextId, message);
    nextId += 1;
  };

  public query ({ caller }) func getMessages() : async [Message] {
    if (caller != admin) { Runtime.trap("Unauthorized") };
    messages.values().toArray().sort();
  };
};
