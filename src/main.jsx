import React, { useState } from 'react';
import { createRoot } from 'react-dom/client';
import {
  AppBar, Toolbar, Typography, Button, Box, Container, Stack, Grid,
  Card, CardContent, Chip, Divider, IconButton, Dialog, DialogTitle,
  DialogContent, TextField, MenuItem, Rating, Fab
} from '@mui/material';
import {
  Menu, Close, ArrowForward, WineBar, Favorite, Groups, Restaurant,
  Sailing, Star, CalendarMonth, AutoAwesome, LocalBar, Phone
} from '@mui/icons-material';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import './styles.css';

const gold = '#d8b46a';
const cream = '#f7f3eb';
const navy = '#07131d';

const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: { main: gold },
    background: { default: navy, paper: '#0d1d29' },
    text: { primary: '#fffaf0', secondary: '#b9c5ca' }
  },
  typography: {
    fontFamily: '"Inter", "Helvetica Neue", Arial, sans-serif',
    h1: { fontFamily: '"Cormorant Garamond", Georgia, serif', fontWeight: 500 },
    h2: { fontFamily: '"Cormorant Garamond", Georgia, serif', fontWeight: 500 },
    h3: { fontFamily: '"Cormorant Garamond", Georgia, serif', fontWeight: 500 }
  },
  shape: { borderRadius: 18 }
});

const experiences = [
  {
    icon: <Favorite />,
    title: 'Sunset for Two',
    price: 'from £295',
    text: 'A private evening aboard the Princess. Golden-hour views, beautiful food, chilled Champagne and nowhere else to be.',
    tag: 'Most romantic'
  },
  {
    icon: <WineBar />,
    title: 'Valentine’s Afloat',
    price: 'from £695',
    text: 'A romantic yacht escape with flowers, chocolates, drinks and a beautifully prepared dinner for two.',
    tag: 'February favourite'
  },
  {
    icon: <Groups />,
    title: 'The Yacht Party',
    price: 'from £795',
    text: 'Bring your people. Private entertainment, drinks, food and a luxury waterfront setting for up to 12 guests.',
    tag: 'Up to 12'
  }
];

const destinations = [
  ['London', 'Private yacht in the city', 'January · February · March · November · December'],
  ['Brighton', 'A yacht weekend by the sea', 'April · May'],
  ['Falmouth', 'Stay aboard in Cornwall', 'June'],
  ['Loch Ness', 'Sleep on Loch Ness', 'July'],
  ['Edinburgh', 'Your yacht at the Fringe', 'August'],
  ['Liverpool', 'Waterfront weekend', 'September'],
  ['Bristol', 'Stay in the Floating Harbour', 'October']
];

function BookingDialog({ open, onClose }) {
  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm"
      PaperProps={{ sx: { bgcolor: '#0d1d29', border: '1px solid rgba(216,180,106,.35)' } }}>
      <DialogTitle sx={{ fontFamily: 'Cormorant Garamond', fontSize: 34 }}>
        Create your Princess experience
      </DialogTitle>
      <DialogContent>
        <Typography color="text.secondary" sx={{ mb: 3 }}>
          Tell us what you are celebrating. We will shape the experience around you.
        </Typography>
        <Stack spacing={2}>
          <TextField label="Name" fullWidth />
          <TextField label="Email" type="email" fullWidth />
          <TextField select label="Experience" defaultValue="Sunset for Two" fullWidth>
            {experiences.map(x => <MenuItem key={x.title} value={x.title}>{x.title}</MenuItem>)}
          </TextField>
          <TextField select label="Guests" defaultValue="2" fullWidth>
            {[2,4,6,8,10,12].map(n => <MenuItem key={n} value={n}>{n} guests</MenuItem>)}
          </TextField>
          <TextField label="Preferred destination / date" placeholder="e.g. London · 14 February" fullWidth />
          <TextField label="Anything you'd like us to arrange?" multiline minRows={3} fullWidth />
          <Button variant="contained" size="large" onClick={onClose}
            sx={{ py: 1.5, fontWeight: 700, color: '#07131d' }}>
            Enquire privately <ArrowForward />
          </Button>
        </Stack>
      </DialogContent>
    </Dialog>
  );
}

function App() {
  const [menu, setMenu] = useState(false);
  const [booking, setBooking] = useState(false);

  const go = id => {
    setMenu(false);
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <ThemeProvider theme={theme}>
      <Box className="site">
        <AppBar position="fixed" elevation={0}
          sx={{ bgcolor: 'rgba(7,19,29,.72)', backdropFilter: 'blur(18px)', borderBottom: '1px solid rgba(255,255,255,.08)' }}>
          <Toolbar sx={{ minHeight: '76px !important', px: { xs: 2, md: 5 } }}>
            <Box sx={{ flexGrow: 1, cursor: 'pointer' }} onClick={() => go('top')}>
              <Typography sx={{ letterSpacing: '.25em', fontSize: { xs: 13, md: 15 }, fontWeight: 700 }}>
                THE PRINCESS
              </Typography>
              <Typography sx={{ color: gold, letterSpacing: '.42em', fontSize: 9, mt: -.3 }}>EXPERIENCE</Typography>
            </Box>
            <Stack direction="row" spacing={3} sx={{ display: { xs: 'none', md: 'flex' } }}>
              {['Experiences','The Yacht','Destinations','Occasions'].map((x,i) =>
                <Button key={x} color="inherit" onClick={() => go(['experiences','yacht','destinations','occasions'][i])}
                  sx={{ textTransform: 'none', fontSize: 14 }}>{x}</Button>
              )}
            </Stack>
            <Button variant="outlined" onClick={() => setBooking(true)}
              sx={{ ml: { xs: 0, md: 3 }, borderColor: gold, color: gold, borderRadius: 99, px: 2.5 }}>
              Enquire
            </Button>
            <IconButton onClick={() => setMenu(!menu)} sx={{ display: { xs: 'flex', md: 'none' }, ml: 1, color: 'white' }}>
              {menu ? <Close/> : <Menu/>}
            </IconButton>
          </Toolbar>
          {menu && <Box sx={{ p: 2, bgcolor: '#07131d' }}>
            {['Experiences','The Yacht','Destinations','Occasions'].map((x,i) =>
              <Button fullWidth key={x} color="inherit" onClick={() => go(['experiences','yacht','destinations','occasions'][i])}
                sx={{ justifyContent: 'flex-start', py: 1.5 }}>{x}</Button>
            )}
          </Box>}
        </AppBar>

        <section id="top" className="hero">
          <Box className="heroOverlay" />
          <Container maxWidth="lg" className="heroContent">
            <Chip label="PRIVATE LUXURY · THE PRINCESS 388" sx={{ mb: 3, color: gold, borderColor: 'rgba(216,180,106,.55)', bgcolor: 'rgba(0,0,0,.2)' }} variant="outlined"/>
            <Typography variant="h1" sx={{ fontSize: { xs: 58, md: 92 }, lineHeight: .88, maxWidth: 900 }}>
              Not just a stay.<br/><em>The whole evening.</em>
            </Typography>
            <Typography sx={{ mt: 3, maxWidth: 650, fontSize: { xs: 17, md: 21 }, color: '#e2e7e8', lineHeight: 1.65 }}>
              Step aboard a Princess 388 and make the waterfront yours. Sunset dinners for two,
              Valentine’s escapes, unforgettable celebrations and private entertainment for up to 12.
            </Typography>
            <Stack direction={{ xs:'column', sm:'row' }} spacing={2} sx={{ mt: 5 }}>
              <Button variant="contained" size="large" onClick={() => setBooking(true)}
                endIcon={<ArrowForward/>} sx={{ px: 3.5, py: 1.7, color: navy, fontWeight: 800 }}>
                Design your experience
              </Button>
              <Button variant="outlined" size="large" onClick={() => go('experiences')}
                sx={{ px: 3.5, py: 1.7, borderColor: 'rgba(255,255,255,.45)', color: 'white' }}>
                Explore experiences
              </Button>
            </Stack>
          </Container>
          <Box className="scrollHint">SCROLL TO EXPLORE <span>↓</span></Box>
        </section>

        <section className="introBand">
          <Container maxWidth="lg">
            <Grid container spacing={5} alignItems="center">
              <Grid size={{ xs:12, md:5 }}>
                <Typography className="eyebrow">THE IDEA</Typography>
                <Typography variant="h2" sx={{ fontSize: { xs: 44, md: 60 }, lineHeight: 1 }}>
                  A boutique hotel.<br/>A private yacht.<br/><em>One night to remember.</em>
                </Typography>
              </Grid>
              <Grid size={{ xs:12, md:7 }}>
                <Typography color="text.secondary" sx={{ fontSize: 18, lineHeight: 1.85 }}>
                  The Princess Experience is designed as a travelling luxury hospitality brand:
                  one recognisable yacht appearing in iconic UK waterfront destinations.
                  You are not booking a boat — you are booking privacy, atmosphere, beautiful
                  surroundings and a carefully curated experience.
                </Typography>
                <Stack direction="row" spacing={5} sx={{ mt: 4 }}>
                  <Box><Typography variant="h4">2–12</Typography><Typography color="text.secondary">guests</Typography></Box>
                  <Box><Typography variant="h4">7</Typography><Typography color="text.secondary">UK destinations</Typography></Box>
                  <Box><Typography variant="h4">24/7</Typography><Typography color="text.secondary">the memories last</Typography></Box>
                </Stack>
              </Grid>
            </Grid>
          </Container>
        </section>

        <section id="experiences" className="darkSection">
          <Container maxWidth="lg">
            <Typography className="eyebrow">CHOOSE YOUR MOMENT</Typography>
            <Typography variant="h2" sx={{ fontSize: { xs: 48, md: 68 }, mb: 5 }}>
              Made for <em>occasion</em>.
            </Typography>
            <Grid container spacing={3}>
              {experiences.map(x => (
                <Grid size={{ xs:12, md:4 }} key={x.title}>
                  <Card className="experienceCard">
                    <CardContent sx={{ p: 4 }}>
                      <Box className="goldIcon">{x.icon}</Box>
                      <Chip label={x.tag} size="small" sx={{ mb: 2, color: gold, bgcolor: 'rgba(216,180,106,.1)' }}/>
                      <Typography variant="h3" sx={{ fontSize: 39 }}>{x.title}</Typography>
                      <Typography color="text.secondary" sx={{ mt: 1.5, lineHeight: 1.7 }}>{x.text}</Typography>
                      <Divider sx={{ my: 3, borderColor: 'rgba(255,255,255,.1)' }}/>
                      <Stack direction="row" justifyContent="space-between" alignItems="center">
                        <Typography sx={{ color: gold, fontWeight: 700 }}>{x.price}</Typography>
                        <Button endIcon={<ArrowForward/>} onClick={() => setBooking(true)} sx={{ color:'white' }}>Enquire</Button>
                      </Stack>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Container>
        </section>

        <section id="yacht" className="yachtSection">
          <Container maxWidth="lg">
            <Grid container spacing={{ xs:4, md:8 }} alignItems="center">
              <Grid size={{ xs:12, md:6 }}>
                <Box className="yachtImage luxuryFrame">
                  <Box className="imageCaption"><Sailing/> THE PRINCESS 388</Box>
                </Box>
              </Grid>
              <Grid size={{ xs:12, md:6 }}>
                <Typography className="eyebrow">YOUR PRIVATE SETTING</Typography>
                <Typography variant="h2" sx={{ fontSize: { xs: 48, md: 68 } }}>The yacht is<br/><em>the destination.</em></Typography>
                <Typography color="text.secondary" sx={{ mt: 2, lineHeight: 1.8, fontSize: 17 }}>
                  Designed around the feeling of arriving somewhere special. Come aboard, pour a drink,
                  watch the light change and let the rest of the world disappear.
                </Typography>
                <Stack spacing={2.2} sx={{ mt: 4 }}>
                  {[
                    [Restaurant, 'Private dining & grazing experiences'],
                    [LocalBar, 'Curated premium bar & celebration drinks'],
                    [AutoAwesome, 'Optional flowers, styling & photography'],
                    [Sailing, 'Selected private cruising experiences where permitted']
                  ].map(([I,t]) => <Stack direction="row" spacing={2} alignItems="center" key={t}>
                    <I sx={{ color: gold }}/><Typography>{t}</Typography>
                  </Stack>)}
                </Stack>
                <Button sx={{ mt: 4, color: gold }} endIcon={<ArrowForward/>} onClick={() => go('destinations')}>
                  See where we appear
                </Button>
              </Grid>
            </Grid>
          </Container>
        </section>

        <section id="occasions" className="occasionSection">
          <Container maxWidth="lg">
            <Typography className="eyebrow">THE MOMENT MATTERS</Typography>
            <Typography variant="h2" sx={{ fontSize: { xs: 50, md: 72 }, maxWidth: 850 }}>
              From <em>“just us”</em> to<br/>“everyone’s coming”.
            </Typography>
            <Grid container spacing={2} sx={{ mt: 4 }}>
              {[
                ['Valentine’s', 'Flowers. Dinner. Champagne. Sunset. Just the two of you.', '£695+'],
                ['Anniversary', 'A private yacht, a beautiful table and a reason to slow down.', '£500+'],
                ['Proposal', 'A once-in-a-lifetime setting, styled exactly how you imagined it.', '£750+'],
                ['Birthday', 'Up to 12 guests, private entertainment and the waterfront as your backdrop.', '£795+']
              ].map(([a,b,c]) => <Grid size={{ xs:12, sm:6 }} key={a}>
                <Box className="occasionCard">
                  <Typography variant="h3" sx={{ fontSize: 38 }}>{a}</Typography>
                  <Typography color="text.secondary" sx={{ mt: 1, maxWidth: 480, lineHeight: 1.65 }}>{b}</Typography>
                  <Typography sx={{ mt: 2, color: gold }}>{c}</Typography>
                </Box>
              </Grid>)}
            </Grid>
          </Container>
        </section>

        <section id="destinations" className="darkSection destinations">
          <Container maxWidth="lg">
            <Typography className="eyebrow">THE YACHT MOVES</Typography>
            <Typography variant="h2" sx={{ fontSize: { xs: 50, md: 70 } }}>Seven <em>waterfront worlds</em>.</Typography>
            <Typography color="text.secondary" sx={{ maxWidth: 700, mt: 2, mb: 5, lineHeight: 1.7 }}>
              The 2026/27 plan follows seasonal demand, events and the most atmospheric waterfront destinations.
              Every relocation is subject to marina permission, berth availability, insurance and passage logistics.
            </Typography>
            <Grid container spacing={2}>
              {destinations.map(([place, line, months], i) => <Grid size={{ xs:12, sm:6, md:4 }} key={place}>
                <Box className="destinationCard">
                  <Typography sx={{ color: gold, fontSize: 12, letterSpacing: '.18em' }}>0{i+1}</Typography>
                  <Typography variant="h3" sx={{ fontSize: 40, mt: 1 }}>{place}</Typography>
                  <Typography sx={{ mt: 1 }}>{line}</Typography>
                  <Typography color="text.secondary" sx={{ mt: 2, fontSize: 13 }}>{months}</Typography>
                </Box>
              </Grid>)}
            </Grid>
          </Container>
        </section>

        <section className="quoteSection">
          <Container maxWidth="md" sx={{ textAlign:'center' }}>
            <Star sx={{ color: gold, fontSize: 30 }}/>
            <Typography variant="h2" sx={{ fontSize: { xs: 43, md: 60 }, mt: 2 }}>
              “You are not booking a boat.<br/><em>You are booking the memory.</em>”
            </Typography>
            <Typography color="text.secondary" sx={{ mt: 3 }}>
              A recognisable yacht. A changing destination. Limited availability.
            </Typography>
            <Button variant="contained" size="large" onClick={() => setBooking(true)}
              sx={{ mt: 4, color: navy, px: 4 }}>
              Start planning
            </Button>
          </Container>
        </section>

        <footer className="footer">
          <Container maxWidth="lg">
            <Grid container spacing={5}>
              <Grid size={{ xs:12, md:5 }}>
                <Typography sx={{ letterSpacing: '.25em', fontWeight: 800 }}>THE PRINCESS</Typography>
                <Typography sx={{ color: gold, letterSpacing: '.4em', fontSize: 9 }}>EXPERIENCE</Typography>
                <Typography color="text.secondary" sx={{ mt: 2, maxWidth: 420, lineHeight: 1.7 }}>
                  Private luxury yacht stays and experiences across iconic UK waterfront destinations.
                </Typography>
              </Grid>
              <Grid size={{ xs:6, md:3 }}>
                <Typography sx={{ fontWeight:700 }}>Explore</Typography>
                {['Experiences','The Yacht','Destinations','Occasions'].map(x => <Button key={x} onClick={() => go(x==='The Yacht'?'yacht':x.toLowerCase())}
                  sx={{ display:'block', px:0, color:'text.secondary', textTransform:'none' }}>{x}</Button>)}
              </Grid>
              <Grid size={{ xs:6, md:4 }}>
                <Typography sx={{ fontWeight:700 }}>Private enquiries</Typography>
                <Typography color="text.secondary" sx={{ mt:1 }}>For proposals, parties, dining and bespoke experiences.</Typography>
                <Button onClick={() => setBooking(true)} sx={{ mt:1, color:gold }} endIcon={<ArrowForward/>}>Make an enquiry</Button>
              </Grid>
            </Grid>
            <Divider sx={{ my:5, borderColor:'rgba(255,255,255,.1)' }}/>
            <Typography color="text.secondary" sx={{ fontSize:12 }}>
              © 2026 The Princess Experience · All experiences subject to location, marina, insurance and regulatory approval.
            </Typography>
          </Container>
        </footer>

        <Fab color="primary" aria-label="enquire" onClick={() => setBooking(true)}
          sx={{ position:'fixed', right:22, bottom:22, color:navy, display:{xs:'flex',md:'none'} }}>
          <CalendarMonth/>
        </Fab>
        <BookingDialog open={booking} onClose={() => setBooking(false)} />
      </Box>
    </ThemeProvider>
  );
}

createRoot(document.getElementById('root')).render(<App />);
