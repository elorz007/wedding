name: inverse
layout: true
class: center, middle, inverse
---
#Fastlane introduction
[SecurePIM iOS]
---
layout: false
.left-column[
  ## General concepts
]
.right-column[
- Tool for performing repetitive tasks automatically

- https://fastlane.tools/

![Tools](../images/tools.png)

]
---
.left-column[
  ## General concepts
]
.right-column[
- Lanes:
  - Like scripts
  - A bunch of tasks in order
  - e.g:
      - Clean derived data
      - Reset simulators
      - Build dependencies
      - Run unit tests
      - Generate ipa
      - Take screenshots
      - Upload to Itunes Connect
      - Submit for review

- Tools as standalone:
  - sigh, pilot, etc. installed and used in command line on their own

]
---
Install
```bash
sudo gem install fastlane
```
Launch lanes
```bash
# On the project's base dir
fastlane name_of_the_lane
```
Launch lane with options
```bash
fastlane build scheme:"SuperSecurePIMEnterprise" output_name:"IpaName" configuration:"Release"
```
Launch multiple lanes
```bash
fastlane clean_environment && fastlane clean && fastlane build_dependencies && fastlane test
```
---
See all available lanes in the project
```bash
*$ fastlane
[14:24:10]: Welcome to fastlane! Here's what your app is setup to do:
+--------+------------------------+-------------------------------------------------------------------------------+
|                                             Available lanes to run                                              |
+--------+------------------------+-------------------------------------------------------------------------------+
| Number | Lane Name              | Description                                                                   |
+--------+------------------------+-------------------------------------------------------------------------------+
| 1      | ios build              | Builds the app and generates ipa                                              |
| 2      | ios upload             | Uploads ipa to itunes connect                                                 |
| 3      | ios sonar_review       | Runs sonar analysis for reviews (delta only)                                  |
| 4      | ios sonar_nightly      | Runs sonar analysis for nightly (full analysis)                               |
| 5      | ios test               | Runs the tests of the iOS App                                                 |
| 6      | ios clean              | Cleans the project, warning this will remove all files, even ones in profress |
| 7      | ios clean_environment  | Cleans other environment and tools                                            |
| 8      | ios build_dependencies | Runs build dependencies                                                       |
| 0      | cancel                 | No selection, exit fastlane!                                                  |
+--------+------------------------+-------------------------------------------------------------------------------+
Which number would you like run?
█
```
See all available fastlane actions (tools)
```bash
fastlane actions
fastlane action slack
```

---
.left-column[
  ## File structure
]
.right-column[
(Project's base dir)
- fastlane/
  - **Fastfile**
  - Gymfile
  - Scanfile
  - ...
  - scripts/
      - something.sh
]
---
.left-column[
  ## Configuration files
]
.right-column[
fastlane/Fastfile
```ruby
fastlane_version "1.10.0"

default_platform :ios

platform :ios do

  desc "Builds the app and generates ipa"
  lane :build do |options|
    gym(
      scheme: options[:scheme],
      output_name: options[:output_name],
      configuration: options[:configuration]
    )
  end

end
```
fastlane/Gymfile
```ruby
workspace "SecurePIM.xcworkspace/"
output_directory "ipa"
derived_data_path "DerivedData"
clean true
```
]
---
.left-column[
  ## Lane examples
]
.right-column[
```ruby
  desc "Cleans other environment and tools"
  lane :clean_environment do
    clear_derived_data
    reset_simulators
  end
```
```ruby
  desc "Cleans the project, warning this will remove all files, even ones in profress"
  lane :clean do
    reset_git_repo(
      force: true,
      disregard_gitignore: true
    )
    clean_cocoapods_cache
  end
```
]
---
.left-column[
  ## Private lanes
]
.right-column[
```ruby
  desc "Runs sonar analysis for reviews (delta only)"
  lane :sonar_review do
    sonar_common(scan_type:'issues')
  end

  desc "Runs sonar analysis for nightly (full analysis)"
  lane :sonar_nightly do
    sonar_common(scan_type:'publish')
  end

  desc "Common lane for all public sonar lanes"
*   private_lane :sonar_common do |options|
    scan_type = options[:scan_type]
    sh "cd .. && ./ios-spim/ios-spim-config/scripts/sonar-run.sh -w './' -m '#{scan_type}'"
  end
```
]
---
template: inverse

## Demo
---
name: last-page
template: inverse

#Fastlane introduction
[SecurePIM iOS]

Slideshow created using [remark](http://github.com/gnab/remark).
