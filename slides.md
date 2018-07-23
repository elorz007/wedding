name: inverse
layout: true
class: center, middle, inverse
---
#Government & Smartcard introduction
[SecurePIM iOS]
---
layout: false
- SecurePIM > Secure Personal Information Management
- Mail, calendar, contacts, documents, tasks, notes, browser.
- Government: our most secure solution with hardware based tokens
    - Container solution
    - S/MIME encryption
    - TLS
    - Intranet page gateway
- Very complex infrastructure
  - Multiple VPNs
  - Multiple (hidden) sub-networks and DMZ
  - Complex CRL and OCSP
  - Traffic analysis tools
  - Proxies
  - ...


![spim](../images/spim.png)
---
.left-column[
  ## Registration
]

.right-column[
- No network, no data persisted
  - First step: unlock smartcard
- Selection of reader
  - Pairing (also in Settings.app)
- Pin not stored + going to background
  - Disconnect from reader
  - Logout
  - All data erased
- Ability to forget
  - Not chosen
  - Still paired
- Support for non-numeric passwords
- Certificate pinning
.footnote[
  .soft[
  BS846367
  ]
]
]
---
.left-column[
  ## Features
]
.right-column[
- Import extra keys
  - We need the pin of the smartcard
- Usages of certificates
- Encryption and signature of emails
- Local encryption of files
- SecurePIM Gateway
- https://confluence.virtual-solution.de/pages/viewpage.action?spaceKey=SAL&title=Support+and+Maintenance+Bxx
]
---
.left-column[
  ## Login Logout
]
.right-column[
- Manually
- Remove card
- Power off / disconnect
- Autolock
- **Switch processes**
- Forget reader
- Tries remaining
- Battery (planned)
]

---
.left-column[
  ## We don't have
]
.right-column[
- Modifying cards
- Multiple readers
- PUK / PIN2 unblocking
- Grace period (for now)
]
---
template: inverse

## Questions?
---
name: last-page
template: inverse

#Government & Smartcard introduction
[SecurePIM iOS]

.footnote[
Slideshow created using [remark](http://github.com/gnab/remark).
]
