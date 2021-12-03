<?php

namespace App\Entity;

use ApiPlatform\Core\Annotation\ApiResource;
use App\Repository\InfirmierRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Serializer\Annotation\Groups;


/**
 * @ORM\Entity(repositoryClass=InfirmierRepository::class)
 */
#[ApiResource(
    normalizationContext: ['groups' => ['infirmiers_read']],
    attributes: ["pagination_enabled" => false]
)]
class Infirmier
{
    /**
     * @ORM\Id
     * @ORM\GeneratedValue
     * @ORM\Column(type="integer")
     * @Groups({"infirmiers_read"})
     */
    private $id;

    /**
     * @ORM\Column(type="string", length=255)
     * @Groups({"infirmiers_read"})
     */
    private $prenom;

    /**
     * @ORM\Column(type="string", length=255)
     * @Groups({"infirmiers_read"})
     */
    private $nom;

    /**
     * @ORM\Column(type="integer")
     * @Groups({"infirmiers_read"})
     */
    private $age;

    /**
     * @ORM\Column(type="string", length=255)
     * @Groups({"infirmiers_read"})
     */
    private $motDePasse;

    /**
     * @ORM\ManyToOne(targetEntity=Service::class, inversedBy="infirmiers")
     * @ORM\JoinColumn(nullable=false)
     * @Groups({"infirmiers_read"})
     */
    private $service;

    /**
     * @ORM\OneToOne(targetEntity=User::class, mappedBy="infirmier", cascade={"persist", "remove"})
     * @Groups({"infirmiers_read"})
     */
    private $user;


    public function __construct()
    {
        $this->users = new ArrayCollection();
    }


    public function getId(): ?int
    {
        return $this->id;
    }

    public function getPrenom(): ?string
    {
        return $this->prenom;
    }

    public function setPrenom(string $prenom): self
    {
        $this->prenom = $prenom;

        return $this;
    }

    public function getNom(): ?string
    {
        return $this->nom;
    }

    public function setNom(string $nom): self
    {
        $this->nom = $nom;

        return $this;
    }

    public function getAge(): ?int
    {
        return $this->age;
    }

    public function setAge(int $age): self
    {
        $this->age = $age;

        return $this;
    }

    public function getMotDePasse(): ?string
    {
        return $this->motDePasse;
    }

    public function setMotDePasse(string $motDePasse): self
    {
        $this->motDePasse = $motDePasse;

        return $this;
    }

    public function getService(): ?Service
    {
        return $this->service;
    }

    public function setService(?Service $service): self
    {
        $this->service = $service;

        return $this;
    }

    public function getUser(): ?User
    {
        return $this->user;
    }

    public function setUser(?User $user): self
    {
        // unset the owning side of the relation if necessary
        if ($user === null && $this->user !== null) {
            $this->user->setInfirmier(null);
        }

        // set the owning side of the relation if necessary
        if ($user !== null && $user->getInfirmier() !== $this) {
            $user->setInfirmier($this);
        }

        $this->user = $user;

        return $this;
    }




}
