import {
    CalendarDays,
    Home,
    Menu as MenuIcon,
    ShoppingBasket,
    User,
    UtensilsCrossed,
    Plus,
    Minus,
    Clock3,
    Users,
    Gift,
    CheckCircle2,
  } from "lucide-react";
  import { useMemo, useState } from "react";
  import "./index.css";
  
  export default function LittleLemonBookingPage() {
    const [selectedDay, setSelectedDay] = useState(4);
    const [selectedTime, setSelectedTime] = useState("18:00");
    const [guests, setGuests] = useState(4);
    const [occasion, setOccasion] = useState("Birthday");
    const [screen, setScreen] = useState("book");
  
    const [customerName, setCustomerName] = useState("");
    const [customerEmail, setCustomerEmail] = useState("");
    const [reservationMessage, setReservationMessage] = useState("");
    const [reservationConfirmed, setReservationConfirmed] = useState(false);
    const [reservationCode, setReservationCode] = useState("");
    const [error, setError] = useState("");
  
    const weekDays = ["MON", "TUE", "WED", "THU", "FRI", "SAT", "SUN"];
    const dates = [25, 26, 27, 28, 29, 30, 1, 2, 3, 4, 5, 6, 7, 8];
    const times = ["12:00", "13:00", "14:00", "18:00", "19:00", "20:00", "21:00"];
    const occasionOptions = ["Birthday", "Anniversary"];
  
    const formattedDate = useMemo(
      () => `Thursday, Oct ${selectedDay}, 2023`,
      [selectedDay]
    );
  
    const navItems = [
      { key: "home", label: "HOME", icon: Home },
      { key: "menu", label: "MENU", icon: UtensilsCrossed },
      { key: "book", label: "BOOK", icon: CalendarDays },
      { key: "cart", label: "CART", icon: ShoppingBasket },
    ];
  
    function handleReservation() {
      setError("");
  
      if (!customerName.trim()) {
        setError("Please enter your name.");
        return;
      }
  
      if (!customerEmail.trim() || !customerEmail.includes("@")) {
        setError("Please enter a valid email.");
        return;
      }
  
      const reservation = {
        id: `LL-${Date.now().toString().slice(-6)}`,
        name: customerName.trim(),
        email: customerEmail.trim(),
        date: formattedDate,
        time: selectedTime,
        guests,
        occasion,
        message: reservationMessage.trim(),
        createdAt: new Date().toISOString(),
      };
  
      const existingReservations = JSON.parse(
        localStorage.getItem("little-lemon-reservations") || "[]"
      );
  
      existingReservations.push(reservation);
  
      localStorage.setItem(
        "little-lemon-reservations",
        JSON.stringify(existingReservations)
      );
  
      setReservationCode(reservation.id);
      setReservationConfirmed(true);
    }
  
    function startNewReservation() {
      setReservationConfirmed(false);
      setCustomerName("");
      setCustomerEmail("");
      setReservationMessage("");
      setError("");
      setScreen("book");
    }
  
    return (
      <div className="little-lemon-app">
        <div className="layout">
          <PhoneFrame>
            {reservationConfirmed ? (
              <ConfirmationScreen
                reservationCode={reservationCode}
                customerName={customerName}
                formattedDate={formattedDate}
                selectedTime={selectedTime}
                guests={guests}
                occasion={occasion}
                onBookAnother={startNewReservation}
              />
            ) : screen === "home" ? (
              <HomeScreen onReserve={() => setScreen("book")} />
            ) : (
              <BookingScreen
                weekDays={weekDays}
                dates={dates}
                selectedDay={selectedDay}
                setSelectedDay={setSelectedDay}
                times={times}
                selectedTime={selectedTime}
                setSelectedTime={setSelectedTime}
                guests={guests}
                setGuests={setGuests}
                occasion={occasion}
                setOccasion={setOccasion}
                occasionOptions={occasionOptions}
                formattedDate={formattedDate}
                customerName={customerName}
                setCustomerName={setCustomerName}
                customerEmail={customerEmail}
                setCustomerEmail={setCustomerEmail}
                reservationMessage={reservationMessage}
                setReservationMessage={setReservationMessage}
                onReserve={handleReservation}
                error={error}
              />
            )}
  
            <BottomNav navItems={navItems} active={screen} onChange={setScreen} />
          </PhoneFrame>
        </div>
      </div>
    );
  }
  
  function PhoneFrame({ children }) {
    return (
      <div className="phone-frame">
        <div className="phone-side-button"></div>
        <div className="phone-screen">{children}</div>
      </div>
    );
  }
  
  function TopBar() {
    return (
      <div className="topbar">
        <button className="icon-button" type="button">
          <MenuIcon size={24} />
        </button>
  
        <div className="brand-name">Little Lemon</div>
  
        <div className="avatar">
          <User size={16} />
        </div>
      </div>
    );
  }
  
  function HomeScreen({ onReserve }) {
    return (
      <div className="home-screen">
        <TopBar />
  
        <div className="hero-pattern">
          <h1 className="hero-title">Little Lemon</h1>
          <p className="hero-city">Chicago</p>
          <p className="hero-description">
            We are a family-owned Mediterranean restaurant, focused on traditional
            recipes served with a modern twist.
          </p>
  
          <button onClick={onReserve} className="reserve-btn" type="button">
            Reserve a table
          </button>
  
          <div className="hero-image-wrapper">
            <img
              src="https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=900&q=80"
              alt="Little Lemon signature dish"
              className="hero-image"
            />
          </div>
        </div>
      </div>
    );
  }
  
  function BookingScreen({
    weekDays,
    dates,
    selectedDay,
    setSelectedDay,
    times,
    selectedTime,
    setSelectedTime,
    guests,
    setGuests,
    occasion,
    setOccasion,
    occasionOptions,
    formattedDate,
    customerName,
    setCustomerName,
    customerEmail,
    setCustomerEmail,
    reservationMessage,
    setReservationMessage,
    onReserve,
    error,
  }) {
    return (
      <div className="booking-screen">
        <TopBar />
  
        <div className="booking-banner-wrap">
          <div className="booking-banner">
            <img
              src="https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&w=1200&q=80"
              alt="Reserve a table at Little Lemon"
              className="booking-banner-img"
            />
            <div className="booking-banner-overlay"></div>
  
            <div className="booking-banner-content">
              <h2>Reserve a Table</h2>
              <p>
                Experience the authentic flavors of the Mediterranean at our
                sun-drenched terrace.
              </p>
            </div>
          </div>
        </div>
  
        <div className="booking-content">
          <section>
            <div className="section-header">
              <h3>Select a Date</h3>
              <button className="month-btn" type="button">
                October 2023 <CalendarDays size={14} />
              </button>
            </div>
  
            <div className="calendar-card">
              <div className="calendar-weekdays">
                {weekDays.map((day) => (
                  <div key={day}>{day}</div>
                ))}
              </div>
  
              <div className="calendar-dates">
                {dates.map((date, index) => {
                  const active = date === selectedDay;
                  const muted = index < 7;
  
                  return (
                    <button
                      key={`${date}-${index}`}
                      type="button"
                      onClick={() => !muted && setSelectedDay(date)}
                      className={`date-btn ${active ? "date-btn-active" : ""} ${
                        muted ? "date-btn-muted" : ""
                      }`}
                    >
                      {date}
                    </button>
                  );
                })}
              </div>
            </div>
          </section>
  
          <section>
            <h3 className="section-title">Select a Time</h3>
  
            <div className="time-grid">
              {times.map((time) => (
                <button
                  key={time}
                  type="button"
                  onClick={() => setSelectedTime(time)}
                  className={`time-btn ${
                    selectedTime === time ? "time-btn-active" : ""
                  }`}
                >
                  {time}
                </button>
              ))}
            </div>
          </section>
  
          <section>
            <h3 className="section-title">Number of Guests</h3>
  
            <div className="guest-stepper">
              <button
                type="button"
                onClick={() => setGuests((g) => Math.max(1, g - 1))}
                className="stepper-btn"
              >
                <Minus size={16} />
              </button>
  
              <div className="guest-count">{guests}</div>
  
              <button
                type="button"
                onClick={() => setGuests((g) => g + 1)}
                className="stepper-btn"
              >
                <Plus size={16} />
              </button>
            </div>
          </section>
  
          <section>
            <h3 className="section-title">Special Occasion</h3>
  
            <div className="occasion-grid">
              {occasionOptions.map((item) => (
                <button
                  key={item}
                  type="button"
                  onClick={() => setOccasion(item)}
                  className={`occasion-btn ${
                    occasion === item ? "occasion-btn-active" : ""
                  }`}
                >
                  <Gift size={14} /> {item}
                </button>
              ))}
            </div>
          </section>
  
          <section>
            <h3 className="guest-details-title">Guest Details</h3>
  
            <div className="details-grid">
              <input
                type="text"
                value={customerName}
                onChange={(e) => setCustomerName(e.target.value)}
                placeholder="Full name"
                className="form-input"
              />
  
              <input
                type="email"
                value={customerEmail}
                onChange={(e) => setCustomerEmail(e.target.value)}
                placeholder="Email address"
                className="form-input"
              />
  
              <textarea
                value={reservationMessage}
                onChange={(e) => setReservationMessage(e.target.value)}
                placeholder="Notes for your reservation"
                rows={3}
                className="form-textarea"
              />
  
              {error ? <div className="form-error">{error}</div> : null}
            </div>
          </section>
  
          <section className="summary-card">
            <h3>Reservation Summary</h3>
            <div className="summary-divider"></div>
  
            <div className="summary-list">
              <SummaryRow icon={CalendarDays} label="DATE" value={formattedDate} />
              <SummaryRow
                icon={Clock3}
                label="TIME"
                value={`${selectedTime} (Dinner)`}
              />
              <SummaryRow
                icon={Users}
                label="PARTY SIZE"
                value={`${guests} People`}
              />
            </div>
  
            <button onClick={onReserve} className="check-btn" type="button">
              Confirm Reservation
            </button>
  
            <p className="summary-note">
              No credit card required for this booking.
            </p>
  
            <div className="summary-image-wrap">
              <img
                src="https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?auto=format&fit=crop&w=900&q=80"
                alt="Little Lemon signature drink"
                className="summary-image"
              />
              <div className="summary-image-label">Our signature drinks</div>
            </div>
          </section>
        </div>
      </div>
    );
  }
  
  function SummaryRow({ icon: Icon, label, value }) {
    return (
      <div className="summary-row">
        <div className="summary-icon">
          <Icon size={16} />
        </div>
  
        <div>
          <div className="summary-label">{label}</div>
          <div className="summary-value">{value}</div>
        </div>
      </div>
    );
  }
  
  function ConfirmationScreen({
    reservationCode,
    customerName,
    formattedDate,
    selectedTime,
    guests,
    occasion,
    onBookAnother,
  }) {
    return (
      <div className="confirmation-screen">
        <TopBar />
  
        <div className="confirmation-content">
          <div className="confirmation-card">
            <div className="confirmation-icon">
              <CheckCircle2 size={32} />
            </div>
  
            <h2 className="confirmation-title">Reservation Confirmed</h2>
  
            <p className="confirmation-text">
              Thank you, {customerName}. Your table has been booked successfully.
            </p>
  
            <div className="confirmation-summary">
              <div className="booking-code-label">Booking code</div>
              <div className="booking-code">{reservationCode}</div>
  
              <div className="confirmation-summary-list">
                <SummaryRow icon={CalendarDays} label="DATE" value={formattedDate} />
                <SummaryRow icon={Clock3} label="TIME" value={selectedTime} />
                <SummaryRow icon={Users} label="GUESTS" value={`${guests} People`} />
                <SummaryRow icon={Gift} label="OCCASION" value={occasion} />
              </div>
            </div>
  
            <button
              onClick={onBookAnother}
              className="book-another-btn"
              type="button"
            >
              Make Another Reservation
            </button>
          </div>
        </div>
      </div>
    );
  }
  
  function BottomNav({ navItems, active, onChange }) {
    return (
      <div className="bottom-nav-wrap">
        <div className="bottom-nav">
          {navItems.map(({ key, label, icon: Icon }) => {
            const isActive = active === key;
  
            return (
              <button
                key={key}
                type="button"
                onClick={() => onChange(key)}
                className={`nav-btn ${isActive ? "nav-btn-active" : ""}`}
              >
                <Icon size={18} />
                <span>{label}</span>
              </button>
            );
          })}
        </div>
      </div>
    );
  }